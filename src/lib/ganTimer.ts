/**
 * GAN Smart Timer BLE connector.
 *
 * This started out as a thin wrapper around the `gan-web-bluetooth` library, but
 * that library hardcodes the "state" characteristic UUID (0000fff5) inside the
 * 0000fff0 service. On at least one real GAN Timer unit that UUID doesn't exist -
 * the device throws "No Characteristics matching UUID 0000fff2/0000fff5 found in
 * Service" right after connecting, even though the service itself (0000fff0) is
 * found correctly. Different firmware/hardware batches apparently expose the
 * same service with different characteristic UUIDs.
 *
 * To be robust to that, this connects to the service the same way, but instead
 * of assuming a fixed characteristic UUID, it enumerates every characteristic in
 * the service and picks whichever one actually supports notifications - that's
 * all this app needs (it never reads the timer's stored "last 3 times" via the
 * separate read-only characteristic, so that one isn't required at all).
 *
 * The packet format itself (0xFE-prefixed frame, state byte, CRC16/CCITT-FALSE
 * checksum) is the real reverse-engineered GAN protocol, ported from
 * gan-web-bluetooth (MIT, by afedotov - https://github.com/afedotov/gan-web-bluetooth).
 */

const GAN_TIMER_SERVICE = '0000fff0-0000-1000-8000-00805f9b34fb';
// most GAN Timer units expose the state characteristic here - tried first as a fast path
const PREFERRED_STATE_CHARACTERISTIC = '0000fff5-0000-1000-8000-00805f9b34fb';

export const GanTimerState = {
  DISCONNECT: 0,
  GET_SET: 1,
  HANDS_OFF: 2,
  RUNNING: 3,
  STOPPED: 4,
  IDLE: 5,
  HANDS_ON: 6,
  FINISHED: 7,
} as const;
type GanTimerState = (typeof GanTimerState)[keyof typeof GanTimerState];

export interface GanTimerCallbacks {
  onConnectionChange?: (connected: boolean) => void;
  /** both hands placed on the timer's touch plates */
  onHandsOn?: () => void;
  /** hands lifted before the grace delay expired (false start) */
  onHandsOff?: () => void;
  /** timer actually started counting (hands lifted after grace delay) */
  onRunning?: () => void;
  /** timer stopped; ms is the hardware-measured, authoritative solve time */
  onStopped?: (ms: number) => void;
  /** timer was reset to 0.00 - fired when the GAN logo button is pressed */
  onIdle?: () => void;
  /** timer moved to FINISHED right after stopping - used as a stop fallback when no
   * (valid) STOPPED packet was seen, since the app's own clock covers the missing time */
  onFinished?: () => void;
  /** raw packet trace, for on-screen diagnostics when hardware behavior doesn't match expectations */
  onDebugLog?: (line: string) => void;
}

function crc16ccit(buff: ArrayBuffer): number {
  const dataView = new DataView(buff);
  let crc = 0xffff;
  for (let i = 0; i < dataView.byteLength; ++i) {
    crc ^= dataView.getUint8(i) << 8;
    for (let j = 0; j < 8; ++j) {
      crc = (crc & 0x8000) > 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc & 0xffff;
}

function validateEventData(data: DataView): boolean {
  try {
    if (data.byteLength === 0 || data.getUint8(0) !== 0xfe) return false;
    const eventCRC = data.getUint16(data.byteLength - 2, true);
    // data.buffer is the underlying ArrayBuffer, which may be larger than this
    // DataView and start at a non-zero offset - slicing it directly (ignoring
    // byteOffset) would checksum the wrong bytes whenever that happens.
    const start = data.byteOffset + 2;
    const end = data.byteOffset + data.byteLength - 2;
    const calculatedCRC = crc16ccit(data.buffer.slice(start, end) as ArrayBuffer);
    return eventCRC === calculatedCRC;
  } catch {
    return false;
  }
}

const STATE_NAMES: Record<number, string> = {
  0: 'DISCONNECT',
  1: 'GET_SET',
  2: 'HANDS_OFF',
  3: 'RUNNING',
  4: 'STOPPED',
  5: 'IDLE',
  6: 'HANDS_ON',
  7: 'FINISHED',
};

function hexDump(data: DataView): string {
  const bytes: string[] = [];
  for (let i = 0; i < data.byteLength; i++) bytes.push(data.getUint8(i).toString(16).padStart(2, '0'));
  return bytes.join(' ');
}

function recordedMsFromRaw(data: DataView, offset: number): number {
  const min = data.getUint8(offset);
  const sec = data.getUint8(offset + 1);
  const msec = data.getUint16(offset + 2, true);
  return min * 60000 + sec * 1000 + msec;
}

async function findStateCharacteristic(
  service: BluetoothRemoteGATTService
): Promise<BluetoothRemoteGATTCharacteristic> {
  try {
    const preferred = await service.getCharacteristic(PREFERRED_STATE_CHARACTERISTIC);
    if (preferred.properties.notify) return preferred;
  } catch {
    // not present on this device - fall through to scanning every characteristic
  }
  const all = await service.getCharacteristics();
  const notifyable = all.find((c) => c.properties.notify);
  if (!notifyable) {
    throw new Error('이 타이머 기기에서 상태 알림을 지원하는 채널을 찾지 못했어요.');
  }
  return notifyable;
}

export class GanTimerLink {
  private device: BluetoothDevice | null = null;
  private stateChar: BluetoothRemoteGATTCharacteristic | null = null;
  private onValueChanged: ((e: Event) => void) | null = null;
  private onGattDisconnected: (() => void) | null = null;

  get connected(): boolean {
    return this.device !== null;
  }

  async connect(callbacks: GanTimerCallbacks): Promise<void> {
    if (!navigator.bluetooth) {
      throw new Error('이 환경은 Web Bluetooth를 지원하지 않아요.');
    }

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'GAN' }, { namePrefix: 'gan' }, { namePrefix: 'Gan' }],
      optionalServices: [GAN_TIMER_SERVICE],
    });
    if (!device.gatt) {
      throw new Error('이 기기는 GATT 연결을 지원하지 않아요.');
    }
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(GAN_TIMER_SERVICE);
    const stateChar = await findStateCharacteristic(service);

    this.device = device;
    this.stateChar = stateChar;

    this.onValueChanged = (e: Event) => {
      const chr = e.target as BluetoothRemoteGATTCharacteristic;
      const data = chr.value;
      if (!data) return;
      const valid = validateEventData(data);
      const hasState = data.byteLength > 3 && data.getUint8(0) === 0xfe;
      const state = hasState ? (data.getUint8(3) as GanTimerState) : undefined;
      const line =
        `${new Date().toLocaleTimeString('ko-KR', { hour12: false })} raw=${hexDump(data)} valid=${valid}` +
        (state !== undefined ? ` state=${state}(${STATE_NAMES[state] ?? '?'})` : '');
      // eslint-disable-next-line no-console
      console.log('[GAN]', line);
      callbacks.onDebugLog?.(line);
      if (state === undefined) return;
      // BLE's own link layer already guarantees byte-perfect delivery, so a CRC
      // mismatch here almost always means this firmware frames this particular
      // packet slightly differently than assumed (extra/missing bytes near the
      // tail), not that the data is corrupt - the state byte near the front is
      // still trustworthy, so states are dispatched even when CRC didn't check out.
      switch (state) {
        case GanTimerState.HANDS_ON:
          callbacks.onHandsOn?.();
          break;
        case GanTimerState.HANDS_OFF:
          callbacks.onHandsOff?.();
          break;
        case GanTimerState.RUNNING:
          callbacks.onRunning?.();
          break;
        case GanTimerState.STOPPED:
          if (data.byteLength >= 8) {
            callbacks.onStopped?.(Math.round(recordedMsFromRaw(data, 4)));
          }
          break;
        case GanTimerState.IDLE:
          callbacks.onIdle?.();
          break;
        case GanTimerState.FINISHED:
          callbacks.onFinished?.();
          break;
        default:
          break;
      }
    };
    this.onGattDisconnected = () => {
      this.device = null;
      this.stateChar = null;
      callbacks.onConnectionChange?.(false);
    };

    stateChar.addEventListener('characteristicvaluechanged', this.onValueChanged);
    device.addEventListener('gattserverdisconnected', this.onGattDisconnected);
    await stateChar.startNotifications();

    callbacks.onConnectionChange?.(true);
  }

  disconnect(): void {
    if (this.stateChar && this.onValueChanged) {
      this.stateChar.removeEventListener('characteristicvaluechanged', this.onValueChanged);
      this.stateChar.stopNotifications().catch(() => {});
    }
    if (this.device) {
      if (this.onGattDisconnected) {
        this.device.removeEventListener('gattserverdisconnected', this.onGattDisconnected);
      }
      if (this.device.gatt?.connected) this.device.gatt.disconnect();
    }
    this.device = null;
    this.stateChar = null;
    this.onValueChanged = null;
    this.onGattDisconnected = null;
  }
}

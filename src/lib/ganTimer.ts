export interface GanTimerEvents {
  onConnectionChange?: (connected: boolean) => void;
  /** fires on any physical button press detected from the device (see caveat below) */
  onButton?: () => void;
}

/**
 * Best-effort Web Bluetooth connection to a GAN smart timer.
 *
 * IMPORTANT CAVEAT: GAN has not publicly documented the GATT service /
 * characteristic UUIDs or byte-level protocol for its smart timer, and this
 * has not been verified against real hardware. Rather than guessing at
 * specific UUIDs (which would *look* like a real integration but could
 * silently fail to work), this connects generically: it subscribes to
 * notifications on every characteristic the device exposes that supports
 * them, and treats any incoming notification as a generic "button pressed"
 * signal (with a cooldown, since a single physical press can emit several
 * BLE packets). If/when the real protocol is known, replace the body of the
 * characteristicvaluechanged handler below with proper packet parsing.
 */
export class GanTimerConnection {
  private device: BluetoothDevice | null = null;
  private lastTrigger = 0;

  get connected(): boolean {
    return this.device?.gatt?.connected ?? false;
  }

  get name(): string | undefined {
    return this.device?.name;
  }

  async connect(events: GanTimerEvents): Promise<void> {
    if (!navigator.bluetooth) {
      throw new Error('이 환경은 Web Bluetooth를 지원하지 않아요.');
    }

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'GAN' }],
      optionalServices: ['battery_service', 'device_information'],
    });
    this.device = device;
    device.addEventListener('gattserverdisconnected', () => events.onConnectionChange?.(false));

    const server = await device.gatt?.connect();
    if (!server) throw new Error('GATT 서버에 연결하지 못했어요.');
    events.onConnectionChange?.(true);

    let services: BluetoothRemoteGATTService[] = [];
    try {
      services = await server.getPrimaryServices();
    } catch {
      return; // connected, but no readable services - nothing more we can do generically
    }

    for (const service of services) {
      let chars: BluetoothRemoteGATTCharacteristic[] = [];
      try {
        chars = await service.getCharacteristics();
      } catch {
        continue;
      }
      for (const ch of chars) {
        if (!ch.properties.notify) continue;
        try {
          await ch.startNotifications();
          ch.addEventListener('characteristicvaluechanged', () => {
            const now = performance.now();
            if (now - this.lastTrigger < 1500) return;
            this.lastTrigger = now;
            events.onButton?.();
          });
        } catch {
          // characteristic advertised notify but rejected subscription - skip it
        }
      }
    }
  }

  disconnect(): void {
    this.device?.gatt?.disconnect();
    this.device = null;
  }
}

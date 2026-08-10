import { connectGanTimer, GanTimerState, type GanTimerConnection, type GanTimerEvent } from 'gan-web-bluetooth';
import type { Subscription } from 'rxjs';

/**
 * Thin adapter around the `gan-web-bluetooth` library (MIT, by afedotov -
 * https://github.com/afedotov/gan-web-bluetooth), which documents the real
 * reverse-engineered GAN Smart Timer BLE protocol (service/characteristic
 * UUIDs, packet format, CRC16 checksum). Using the real library instead of
 * guessing at the protocol is what makes this integration actually work
 * against real hardware, as opposed to the earlier generic best-effort
 * "any notification = button press" placeholder.
 */
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
}

export class GanTimerLink {
  private conn: GanTimerConnection | null = null;
  private sub: Subscription | null = null;

  get connected(): boolean {
    return this.conn !== null;
  }

  async connect(callbacks: GanTimerCallbacks): Promise<void> {
    if (!navigator.bluetooth) {
      throw new Error('이 환경은 Web Bluetooth를 지원하지 않아요.');
    }

    const conn = await connectGanTimer();
    this.conn = conn;
    callbacks.onConnectionChange?.(true);

    this.sub = conn.events$.subscribe((evt: GanTimerEvent) => {
      switch (evt.state) {
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
          if (evt.recordedTime) {
            callbacks.onStopped?.(Math.round(evt.recordedTime.asTimestamp));
          }
          break;
        case GanTimerState.IDLE:
          callbacks.onIdle?.();
          break;
        case GanTimerState.DISCONNECT:
          this.conn = null;
          callbacks.onConnectionChange?.(false);
          break;
        // GET_SET / FINISHED don't need separate handling for our UI
        default:
          break;
      }
    });
  }

  disconnect(): void {
    this.sub?.unsubscribe();
    this.sub = null;
    this.conn?.disconnect();
    this.conn = null;
  }
}

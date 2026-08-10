// Minimal ambient declarations for the subset of the Web Bluetooth API this
// app uses. Web Bluetooth isn't part of the standard TS DOM lib.

interface BluetoothCharacteristicProperties {
  readonly notify: boolean;
  readonly read: boolean;
  readonly write: boolean;
}

interface BluetoothRemoteGATTCharacteristic extends EventTarget {
  readonly properties: BluetoothCharacteristicProperties;
  readonly value?: DataView;
  startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
  stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTService {
  getCharacteristics(): Promise<BluetoothRemoteGATTCharacteristic[]>;
}

interface BluetoothRemoteGATTServer {
  readonly connected: boolean;
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryServices(): Promise<BluetoothRemoteGATTService[]>;
}

interface BluetoothDevice extends EventTarget {
  readonly name?: string;
  readonly gatt?: BluetoothRemoteGATTServer;
}

interface BluetoothRequestDeviceFilter {
  namePrefix?: string;
  services?: string[];
}

interface BluetoothRequestDeviceOptions {
  filters?: BluetoothRequestDeviceFilter[];
  optionalServices?: string[];
  acceptAllDevices?: boolean;
}

interface Bluetooth {
  requestDevice(options: BluetoothRequestDeviceOptions): Promise<BluetoothDevice>;
}

interface Navigator {
  readonly bluetooth?: Bluetooth;
}

export interface DeviceHealthDataRepo {
  SendDeviceHealthData(req: any): Promise<void>;
}

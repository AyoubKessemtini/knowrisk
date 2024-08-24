export interface IOSHealthDataRepo {
  SendIOSHealthData(req: any): Promise<void>;
}

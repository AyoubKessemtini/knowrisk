import { HeartRateDeviceData } from '@core/entities/deviceDataApisEntity/HeartRate.ts';
import { StressDeviceData } from '@core/entities/deviceDataApisEntity/StressDeviceData.ts';

export interface DeviceDataApisRepo {
  getHeartRateWeeklyData(): Promise<HeartRateDeviceData[]>;
  getStressDailyData(date: string): Promise<StressDeviceData>;
  getSleepDailyData(date: string): Promise<SleepData>;
  getSpo2DailyData(date: string): Promise<Spo2Data>;
}

import { HeartRateDeviceData } from '@core/entities/deviceDataApisEntity/HeartRate.ts';
import { StressDeviceData } from '@core/entities/deviceDataApisEntity/StressDeviceData.ts';

export interface DeviceDataApisRepo {
  getHeartRateWeeklyData(): Promise<HeartRateDeviceData[]>;
  getStressDailyData(date: string): Promise<StressDeviceData[]>;
}

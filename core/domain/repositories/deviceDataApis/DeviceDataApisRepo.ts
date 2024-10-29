import {HeartRateDeviceData} from "@core/entities/deviceDataApisEntity/HeartRate.ts";

export interface DeviceDataApisRepo {
    getHeartRateWeeklyData(): Promise<HeartRateDeviceData[]>;
}

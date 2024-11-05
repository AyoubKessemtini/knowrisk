import { UseCase } from 'core/usecases/Usecase';
import {DeviceDataApisRepo} from "@core/domain/repositories/deviceDataApis/DeviceDataApisRepo.ts";
import {StressDeviceData} from "@core/entities/deviceDataApisEntity/StressDeviceData.ts";

export class GetStressDailyData
    implements UseCase<null, Promise<StressDeviceData>>
{
    constructor(private deviceDataApisRepo: DeviceDataApisRepo) {}

    public async execute(date: string): Promise<StressDeviceData | null> {
        try {
            return await this.deviceDataApisRepo.getStressDailyData(date);
        } catch (error) {
            return null;
        }
    }
}

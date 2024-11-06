import { UseCase } from 'core/usecases/Usecase';
import {DeviceDataApisRepo} from "@core/domain/repositories/deviceDataApis/DeviceDataApisRepo.ts";

export class GetSleepDailyData
    implements UseCase<null, Promise<SleepData>>
{
    constructor(private deviceDataApisRepo: DeviceDataApisRepo) {}

    public async execute(date: string): Promise<SleepData | null> {
        try {
            return await this.deviceDataApisRepo.getSleepDailyData(date);
        } catch (error) {
            return null;
        }
    }
}

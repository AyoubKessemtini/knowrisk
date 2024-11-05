import { UseCase } from 'core/usecases/Usecase';
import { DeviceDataApisRepo } from '@core/domain/repositories/deviceDataApis/DeviceDataApisRepo.ts';

export class GetSpo2DailyData
    implements UseCase<null, Promise<Spo2Data>>
{
    constructor(private deviceDataApisRepo: DeviceDataApisRepo) {}

    public async execute(date: string): Promise<Spo2Data | null> {
        try {
            return await this.deviceDataApisRepo.getSpo2DailyData(date);
        } catch (error) {
            return null;
        }
    }
}

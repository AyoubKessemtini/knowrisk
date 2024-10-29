import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { HRVData } from '@core/domain/entities/fitBitEntities/HrvByDate';
import {DeviceDataApisRepo} from "@core/domain/repositories/deviceDataApis/DeviceDataApisRepo.ts";
import {HeartRateDeviceData} from "@core/entities/deviceDataApisEntity/HeartRate.ts";

type Response = ErrorOr<HRVData>;

export class GetHeartRateWeeklyData
    implements UseCase<null, Promise<Response>>
{
    constructor(private deviceDataApisRepo: DeviceDataApisRepo) {}

    public async execute(): Promise<Response> {
        try {
            const result:HeartRateDeviceData[] = await this.deviceDataApisRepo.getHeartRateWeeklyData();
            return Result.ok(result);
        } catch (error) {
            return Result.fail('heart rate device data', error);
        }
    }
}

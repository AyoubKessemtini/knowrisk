import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { DeviceHealthDataRepo } from '@core/domain/repositories/DeviceHealthDataRepo.ts';

type Response = ErrorOr<void>;

export class StoreDeviceHealthData implements UseCase<any, Promise<Response>> {
  constructor(private deviceHealthDataRepo: DeviceHealthDataRepo) {}

  public async execute(req: any): Promise<Response> {
    try {
      const result = await this.deviceHealthDataRepo.SendDeviceHealthData(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('device data store error', error);
    }
  }
}

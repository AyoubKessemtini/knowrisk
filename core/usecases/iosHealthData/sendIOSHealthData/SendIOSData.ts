import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { IOSHealthDataRepo } from '@core/domain/repositories/IOSHealthDataRepo';

type Response = ErrorOr<void>;

export class SendIOSHealthData implements UseCase<any, Promise<Response>> {
  constructor(private iosHealthDataRepo: IOSHealthDataRepo) {}

  public async execute(req: any): Promise<Response> {
    try {
      const result = await this.iosHealthDataRepo.SendIOSHealthData(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('health data ios', error);
    }
  }
}

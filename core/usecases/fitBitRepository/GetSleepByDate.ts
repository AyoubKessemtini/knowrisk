import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { FitBitRepo } from '@core/domain/repositories/FitBitRepo';
import { SleepData } from '@core/entities/fitBitEntities/SleepByDate.ts';

type Response = ErrorOr<SleepData>;

export interface GetSleepByDateCommand {
  date: string;
}

export class GetSleepByDate
  implements UseCase<GetSleepByDateCommand, Promise<Response>>
{
  constructor(private fitBitRepo: FitBitRepo) {}

  public async execute(req: GetSleepByDateCommand): Promise<Response> {
    try {
      const result = await this.fitBitRepo.getSleepByDate(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('Sleep data fitbit', error);
    }
  }
}

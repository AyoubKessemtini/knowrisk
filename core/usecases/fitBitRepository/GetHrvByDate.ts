import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { FitBitRepo } from '@core/domain/repositories/FitBitRepo';
import { HRVData } from '@core/domain/entities/fitBitEntities/HrvByDate';

type Response = ErrorOr<HRVData>;

export interface GetHrvByDateCommand {
  date: string;
}

export class GetHrvByDate
  implements UseCase<GetHrvByDateCommand, Promise<Response>>
{
  constructor(private fitBitRepo: FitBitRepo) {}

  public async execute(req: GetHrvByDateCommand): Promise<Response> {
    try {
      const result = await this.fitBitRepo.getHrvbyDate(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('health data ios', error);
    }
  }
}

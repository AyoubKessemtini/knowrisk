import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { FitBitRepo } from '@core/domain/repositories/FitBitRepo';
import { StressData } from '@core/entities/fitBitEntities/StressData.ts';

type Response = ErrorOr<StressData>;

export interface GetStressByDateCommand {
  date: string;
}

export class GetStressByDate
  implements UseCase<GetStressByDateCommand, Promise<Response>>
{
  constructor(private fitBitRepo: FitBitRepo) {}

  public async execute(req: GetStressByDateCommand): Promise<Response> {
    try {
      const result = await this.fitBitRepo.getStressByDate(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('Stress data fitbit', error);
    }
  }
}

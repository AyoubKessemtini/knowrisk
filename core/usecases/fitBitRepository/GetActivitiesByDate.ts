import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { FitBitRepo } from '@core/domain/repositories/FitBitRepo';
import { ActivitiesData } from '@core/entities/fitBitEntities/ActivitiesData.ts';

type Response = ErrorOr<ActivitiesData>;

export interface GetActivitiesByDateCommand {
  date: string;
}

export class GetActivitiesByDate
  implements UseCase<GetActivitiesByDateCommand, Promise<Response>>
{
  constructor(private fitBitRepo: FitBitRepo) {}

  public async execute(req: GetActivitiesByDateCommand): Promise<Response> {
    try {
      const result = await this.fitBitRepo.getActivitiesByDate(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('health data ios', error);
    }
  }
}

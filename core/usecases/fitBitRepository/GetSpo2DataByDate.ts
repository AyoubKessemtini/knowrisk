import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { UseCase } from 'core/usecases/Usecase';
import { FitBitRepo } from '@core/domain/repositories/FitBitRepo';
import { SpO2Data } from '@core/entities/fitBitEntities/Spo2Data.ts';

type Response = ErrorOr<SpO2Data>;

export interface GetSpo2ByDateCommand {
  date: string;
}

export class GetSpo2ByDate
  implements UseCase<GetSpo2ByDateCommand, Promise<Response>>
{
  constructor(private fitBitRepo: FitBitRepo) {}

  public async execute(req: GetSpo2ByDateCommand): Promise<Response> {
    try {
      const result = await this.fitBitRepo.getSpo2ByDate(req);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('Stress data fitbit', error);
    }
  }
}

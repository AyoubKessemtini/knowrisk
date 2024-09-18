import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { HRVData } from '../entities/fitBitEntities/HrvByDate';

export interface FitBitRepo {
  getHrvbyDate(req: GetHrvByDateCommand): Promise<HRVData>;
}

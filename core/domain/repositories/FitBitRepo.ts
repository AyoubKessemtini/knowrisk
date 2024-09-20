import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { HRVData } from '../entities/fitBitEntities/HrvByDate';
import { GetSleepByDateCommand } from '@core/usecases/fitBitRepository/GetSleepByDate.ts';
import { GetStressByDateCommand } from '@core/usecases/fitBitRepository/GetStressByDate.ts';
import { GetSpo2ByDateCommand } from '@core/usecases/fitBitRepository/GetSpo2DataByDate.ts';
import { GetActivitiesByDateCommand } from '@core/usecases/fitBitRepository/GetActivitiesByDate.ts';
import { SleepData } from '@core/entities/fitBitEntities/SleepByDate.ts';
import { SpO2Data } from '@core/entities/fitBitEntities/Spo2Data.ts';
import { ActivitiesData } from '@core/entities/fitBitEntities/ActivitiesData.ts';
import { StressData } from '@core/entities/fitBitEntities/StressData.ts';

export interface FitBitRepo {
  getHrvbyDate(req: GetHrvByDateCommand): Promise<HRVData>;
  getSleepByDate(req: GetSleepByDateCommand): Promise<SleepData>;
  getStressByDate(req: GetStressByDateCommand): Promise<StressData>;
  getSpo2ByDate(req: GetSpo2ByDateCommand): Promise<SpO2Data>;
  getActivitiesByDate(req: GetActivitiesByDateCommand): Promise<ActivitiesData>;
}

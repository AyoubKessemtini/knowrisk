import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { fitBitFactory } from '../queryFactory';
import { useQuery } from '@tanstack/react-query';
import { HRVData } from '@core/domain/entities/fitBitEntities/HrvByDate';
import { GetSleepByDateCommand } from '@core/usecases/fitBitRepository/GetSleepByDate.ts';
import { GetStressByDateCommand } from '@core/usecases/fitBitRepository/GetStressByDate.ts';
import { GetSpo2ByDateCommand } from '@core/usecases/fitBitRepository/GetSpo2DataByDate.ts';
import { GetActivitiesByDateCommand } from '@core/usecases/fitBitRepository/GetActivitiesByDate.ts';
import { SleepData } from '@core/entities/fitBitEntities/SleepByDate.ts';
import { StressData } from '@core/entities/fitBitEntities/StressData.ts';
import { SpO2Data } from '@core/entities/fitBitEntities/Spo2Data.ts';
import { ActivitiesData } from '@core/entities/fitBitEntities/ActivitiesData.ts';

export const useGetMerchantByIdQuery = (command: GetHrvByDateCommand) => {
  return useQuery({
    ...fitBitFactory.getMerchantById(command),
    initialData: {} as HRVData,
  });
};

export const useGetSleepByDate = (command: GetSleepByDateCommand) => {
  return useQuery({
    ...fitBitFactory.getSleepByDate(command),
    initialData: {} as SleepData,
  });
};

export const useGetStressByDate = (command: GetStressByDateCommand) => {
  return useQuery({
    ...fitBitFactory.getStressByDate(command),
    initialData: {} as StressData,
  });
};

export const useGetSpo2ByDate = (command: GetSpo2ByDateCommand) => {
  return useQuery({
    ...fitBitFactory.getSpo2ByDate(command),
    initialData: {} as SpO2Data,
  });
};

export const useGetActivitiesByDate = (command: GetActivitiesByDateCommand) => {
  return useQuery({
    ...fitBitFactory.getActivitiesByDate(command),
    initialData: {} as ActivitiesData,
  });
};

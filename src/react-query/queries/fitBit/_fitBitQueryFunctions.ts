import { core } from '@config/Configuration';
import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { defaultQueryResult } from '@query/queryHelpers';
import { GetSleepByDateCommand } from '@core/usecases/fitBitRepository/GetSleepByDate.ts';
import { GetStressByDateCommand } from '@core/usecases/fitBitRepository/GetStressByDate.ts';
import { GetSpo2ByDateCommand } from '@core/usecases/fitBitRepository/GetSpo2DataByDate.ts';
import { GetActivitiesByDateCommand } from '@core/usecases/fitBitRepository/GetActivitiesByDate.ts';

const getHrvByDate = async (command: GetHrvByDateCommand) => {
  const result = await core.getHrvByDate.execute(command);
  return defaultQueryResult(result);
};

const getSleepByDate = async (command: GetSleepByDateCommand) => {
  const result = await core.getSleepByDate.execute(command);
  return defaultQueryResult(result);
};

const getStressByDate = async (command: GetStressByDateCommand) => {
  const result = await core.getStressByDate.execute(command);
  return defaultQueryResult(result);
};

const getSpo2ByDate = async (command: GetSpo2ByDateCommand) => {
  const result = await core.getSpo2ByDate.execute(command);
  return defaultQueryResult(result);
};

const getActivitiesByDate = async (command: GetActivitiesByDateCommand) => {
  const result = await core.getActivities2ByDate.execute(command);
  return defaultQueryResult(result);
};

export const FitBitQueryFunctions = {
  getHrvByDate,
  getSleepByDate,
  getStressByDate,
  getSpo2ByDate,
  getActivitiesByDate,
};

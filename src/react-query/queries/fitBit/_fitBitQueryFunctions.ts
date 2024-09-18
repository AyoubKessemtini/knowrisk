import { core } from '@config/Configuration';
import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { defaultQueryResult } from '@query/queryHelpers';

const getHrvByDate = async (command: GetHrvByDateCommand) => {
  const result = await core.getHrvByDate.execute(command);
  return defaultQueryResult(result);
};

export const FitBitQueryFunctions = {
  getHrvByDate,
};

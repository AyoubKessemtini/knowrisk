import { core } from '@config/Configuration';
import { defaultQueryResult } from '@query/queryHelpers';

const sendIOSHealthData = async (command: unknown) => {
  const result = await core.sendIOSHealthData.execute(command);
  return defaultQueryResult(result);
};

export const IOSHealthDataQueryFunctions = {
  sendIOSHealthData,
};

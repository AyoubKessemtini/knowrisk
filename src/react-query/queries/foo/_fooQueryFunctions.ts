import { core } from '@config/Configuration';
import { GetConversationsComnand } from '@core/usecases/conversationsRepository/getConversations/GetConversationsCommand';
import { defaultQueryResult } from '@query/queryHelpers';

const fetchConversations = async (command: GetConversationsComnand) => {
  const result = await core.getConversations.execute(command);
  return defaultQueryResult(result);
};

export const FooQueryFunctions = {
  fetchConversations,
};

import { GetConversationsComnand } from '@core/usecases/conversationsRepository/getConversations/GetConversationsCommand';
import { queryOptions } from '@tanstack/react-query';
import { FooQueryFunctions } from './foo/_fooQueryFunctions';
import { UserQueryFunctions } from './user/_userQueryFunctions';
import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { FitBitQueryFunctions } from './fitBit/_fitBitQueryFunctions';

export const fooFactory = {
  all: ['foo'] as const,
  fooUsecase: (variables: GetConversationsComnand) =>
    queryOptions({
      queryKey: [
        ...fooFactory.all,
        'genererateIdentification',
        variables,
      ] as const,
      queryFn: () => FooQueryFunctions.fetchConversations(variables),
    }),
};

export const userFactory = {
  getMe: () =>
    queryOptions({
      queryKey: ['getMe'] as const,
      queryFn: () => UserQueryFunctions.getMe(),
    }),
};
export const fitBitFactory = {
  all: ['fitBit'] as const,

  getMerchantById: (command: GetHrvByDateCommand) =>
    queryOptions({
      queryKey: [...fitBitFactory.all, 'hrv', command] as const,
      queryFn: () => FitBitQueryFunctions.getHrvByDate(command),
    }),
};

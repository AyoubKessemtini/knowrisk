import { GetConversationsComnand } from '@core/usecases/conversationsRepository/getConversations/GetConversationsCommand';
import { queryOptions } from '@tanstack/react-query';
import { FooQueryFunctions } from './foo/_fooQueryFunctions';
import { UserQueryFunctions } from './user/_userQueryFunctions';
import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { FitBitQueryFunctions } from './fitBit/_fitBitQueryFunctions';
import { GetSleepByDateCommand } from '@core/usecases/fitBitRepository/GetSleepByDate.ts';
import { GetStressByDateCommand } from '@core/usecases/fitBitRepository/GetStressByDate.ts';
import { GetSpo2ByDateCommand } from '@core/usecases/fitBitRepository/GetSpo2DataByDate.ts';

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

  getSleepByDate: (command: GetSleepByDateCommand) =>
    queryOptions({
      queryKey: [...fitBitFactory.all, 'sleep', command] as const,
      queryFn: () => FitBitQueryFunctions.getSleepByDate(command),
    }),

  getStressByDate: (command: GetStressByDateCommand) =>
    queryOptions({
      queryKey: [...fitBitFactory.all, 'stress', command] as const,
      queryFn: () => FitBitQueryFunctions.getStressByDate(command),
    }),

  getSpo2ByDate: (command: GetSpo2ByDateCommand) =>
    queryOptions({
      queryKey: [...fitBitFactory.all, 'spo2', command] as const,
      queryFn: () => FitBitQueryFunctions.getSpo2ByDate(command),
    }),

  getActivitiesByDate: (command: GetSpo2ByDateCommand) =>
    queryOptions({
      queryKey: [...fitBitFactory.all, 'activities', command] as const,
      queryFn: () => FitBitQueryFunctions.getActivitiesByDate(command),
    }),
};

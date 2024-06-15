import { GetConversationsComnand } from '@core/usecases/conversationsRepository/getConversations/GetConversationsCommand';
import { useQuery } from '@tanstack/react-query';
import { fooFactory } from '../queryFactory';

export const useGetConversationsQuery = (
  variables: GetConversationsComnand,
) => {
  return useQuery({
    ...fooFactory.fooUsecase(variables),
    enabled: false,
    meta: {
      withError: true,
    },
  });
};

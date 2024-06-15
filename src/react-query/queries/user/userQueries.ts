import { useQuery } from '@tanstack/react-query';
import { userFactory } from '../queryFactory';

export const useGetMeQuery = (enabled = true) => {
  return useQuery({
    ...userFactory.getMe(),
    enabled,
  });
};

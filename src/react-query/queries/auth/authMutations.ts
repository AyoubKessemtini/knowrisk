import { useAuth } from '@hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

import { AuthQueryFunctions } from './_authQueryFunctions';

export const useLoginWithEmailMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: AuthQueryFunctions.loginWithEmail,
    onSuccess: ({ token }) => login(token),
  });
};

import { useGetMeQuery } from '@query/queries/user/userQueries';
import { queryClient } from '@query/queryClient';
import { KEYS } from '@storage/Keys';
import { PersistenceStorage } from '@storage/index';
import { AuthActions } from '@store/authSlice';
import { useAppDispatch } from '@store/index';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);

  useGetMeQuery(!!token);

  const logout = () => {
    PersistenceStorage.removeItem(KEYS.ACCESS_TOKEN);
    queryClient.clear();
    dispatch(AuthActions.setLoggedIn(false));
  };

  const login = () => {
    if (token) {
      dispatch(AuthActions.setLoggedIn(true));
    }
  };

  return { logout, login };
};

import RNBootSplash from 'react-native-bootsplash';
import { useGetMeQuery } from '@query/queries/user/userQueries';
import { queryClient } from '@query/queryClient';
import { KEYS } from '@storage/Keys';
import { PersistenceStorage } from '@storage/index';
import { AuthActions } from '@store/authSlice';
import { useAppDispatch } from '@store/index';
import { useState } from 'react';

export const useAuth= () => {
  const dispatch = useAppDispatch();
  const token = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  const [authInit, setAuthInit] = useState(false);
  const { refetch: fetchMe } = useGetMeQuery(false);

  // useGetMeQuery(!!token);

  const logout = () => {
    PersistenceStorage.removeItem(KEYS.ACCESS_TOKEN);
    queryClient.clear();
    dispatch(AuthActions.setLoggedIn(false));
  };
  const newLogin = (newToken: string) => {
    PersistenceStorage.setItem(KEYS.ACCESS_TOKEN, newToken);
    dispatch(AuthActions.setLoggedIn(true));
    finalliseAuth();
  };
  const login = async (newToken?: string) => {
    if (newToken) {
      newLogin(newToken);

      return;
    } else if (token) {
      await existingTokenCheck();
    }
    finalliseAuth();
  };

  const finalliseAuth = () => {
    RNBootSplash.hide({ fade: true });
    console.log(authInit);
    setAuthInit(true);
  };
  const existingTokenCheck = async () => {
    try {
      const { data } = await fetchMe();
      if (data) {
        dispatch(AuthActions.setLoggedIn(true));
      } else {
        // logout();
      }
    } catch (error) {
      // logout();
    } finally {
      finalliseAuth();
    }
  };
  return { logout, login };
};

import { Colors } from '@constants/Colors';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { navigatorConfig } from '../navigatorConfigs';
import { RootStackRoutes } from '../routes';
import { FooStackParamList } from './FooNavigator';
import { TabNavigator, TabStackParamList } from './TabNavigator';
import { useAuth } from '@hooks/useAuth';
import {
  OnboardingNavigator,
  OnboardingStackParamList,
} from './OnboardingNavigator';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
/* import { useAppSelector } from '@store/index'; */

export type RootStackParamList = {
  [RootStackRoutes.TAB_STACK]: NavigatorScreenParams<TabStackParamList>;
  [RootStackRoutes.FOO_STACK]: NavigatorScreenParams<FooStackParamList>;
  [RootStackRoutes.ONBOARDING_STACK]: NavigatorScreenParams<OnboardingStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { login } = useAuth();
  const isLoggedIn = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);

  useEffect(() => {
    login();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        ...navigatorConfig,
        navigationBarColor: Colors.deepRed,
      }}
    >
      {!isLoggedIn ? (
        <Stack.Screen
          name={RootStackRoutes.ONBOARDING_STACK}
          component={OnboardingNavigator}
        />
      ) : (
        <>
          <Stack.Screen
            name={RootStackRoutes.TAB_STACK}
            component={TabNavigator}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

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
import { SettingsInformationScreen } from '@modules/profile/screens/Settings/Information_Screen';
import { EditProfileScreen } from '../../modules/profile/screens/Settings/EditProfile_Screen';
import { ChangePasswordScreen } from '../../modules/profile/screens/Settings/ChangePassword_Screen';
/* import { useAppSelector } from '@store/index'; */

export type RootStackParamList = {
  [RootStackRoutes.TAB_STACK]: NavigatorScreenParams<TabStackParamList>;
  [RootStackRoutes.FOO_STACK]: NavigatorScreenParams<FooStackParamList>;
  [RootStackRoutes.ONBOARDING_STACK]: NavigatorScreenParams<OnboardingStackParamList>;
  [RootStackRoutes.PROFILE_SCREEN]: undefined;
  [RootStackRoutes.SETTINGS_INFORMATION_SCREEN]: undefined;
  [RootStackRoutes.EDIT_PROFILE_SCREEN]: undefined;
  [RootStackRoutes.CHANGE_PASSWORD_SCREEN]: undefined;
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

      <Stack.Screen
        name={RootStackRoutes.SETTINGS_INFORMATION_SCREEN}
        component={SettingsInformationScreen}
      />
      <Stack.Screen
        name={RootStackRoutes.EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={RootStackRoutes.CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
}

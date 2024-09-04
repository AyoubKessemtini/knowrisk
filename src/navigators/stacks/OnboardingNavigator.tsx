import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { OnboardingStackRoutes } from '../routes';
import { navigatorConfig } from '../navigatorConfigs';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from './RootNavigator';
import { LoginScreen } from '@modules/login/screens/Login';

export type OnboardingStackParamList = {
  [OnboardingStackRoutes.LOGIN_SCREEN]: undefined;
};

export type OnboardingStackScreenProps<
  T extends keyof OnboardingStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...navigatorConfig,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={OnboardingStackRoutes.LOGIN_SCREEN}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}

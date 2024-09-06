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
import { WelcomeScreen } from '@modules/onboarding/screens/welcome-screen/WelcomeScreen';
import { RegisterScreen } from '@modules/onboarding/screens/sign_up/RegisterScreen';
import { IntroQuestionScreen } from '@modules/onboarding/screens/q&a/IntroQ&A_Screen';

export type OnboardingStackParamList = {
  [OnboardingStackRoutes.LOGIN_SCREEN]: undefined;
  [OnboardingStackRoutes.WELCOME_SCREEN]: undefined;
  [OnboardingStackRoutes.SIGNUP_SCREEN]: undefined;
  [OnboardingStackRoutes.INTRO_QUESTION_SCREEN]: undefined;
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
        name={OnboardingStackRoutes.WELCOME_SCREEN}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name={OnboardingStackRoutes.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <Stack.Screen
        name={OnboardingStackRoutes.SIGNUP_SCREEN}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={OnboardingStackRoutes.INTRO_QUESTION_SCREEN}
        component={IntroQuestionScreen}
      />
    </Stack.Navigator>
  );
}

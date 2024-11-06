import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { OnboardingStackRoutes } from '../routes';
import { navigatorConfig } from '../navigatorConfigs';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from './RootNavigator';
import { LoginScreen } from '@modules/login/screens/Login';
import { WelcomeScreen } from '@modules/onboarding/screens/welcome-screen/WelcomeScreen';
import { RegisterScreen } from '@modules/onboarding/screens/sign_up/RegisterScreen';
import { IntroQuestionScreen } from '@modules/onboarding/screens/q&a/IntroQ&A_Screen';
import { Question1 } from '@modules/onboarding/screens/q&a/Question1';
//import { Question2 } from '@modules/onboarding/screens/q&a/Question2';
//import { Question5 } from '@modules/onboarding/screens/q&a/Question5';
 import { Question3 } from '@modules/onboarding/screens/q&a/Question3';
import { Question4 } from '@modules/onboarding/screens/q&a/Question4';
//import { Question6 } from '@modules/onboarding/screens/q&a/Question6';
import { ThankyouScreen } from '@modules/onboarding/screens/q&a/ThankyouQ&A_Screen';
import { ForgotPasswordScreen } from '../../modules/onboarding/screens/forget_password/ForgetPasswordScreen';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';

export type OnboardingStackParamList = {
  [OnboardingStackRoutes.LOGIN_SCREEN]: undefined;
  [OnboardingStackRoutes.WELCOME_SCREEN]: undefined;
  [OnboardingStackRoutes.SIGNUP_SCREEN]: undefined;
  [OnboardingStackRoutes.INTRO_QUESTION_SCREEN]: undefined;
  [OnboardingStackRoutes.QUESTION_ONE_SCREEN]: undefined;
  [OnboardingStackRoutes.QUESTION_TWO_SCREEN]: undefined;
  [OnboardingStackRoutes.QUESTION_THREE_SCREEN]: undefined;
  [OnboardingStackRoutes.QUESTION_FOUR_SCREEN]: undefined;
  [OnboardingStackRoutes.QUESTION_FIVE_SCREEN]: undefined;
  [OnboardingStackRoutes.QUESTION_SIX_SCREEN]: undefined;
  [OnboardingStackRoutes.QUESTION_SEVEN_SCREEN]: undefined;
  [OnboardingStackRoutes.THANKYOU_QA_SCREEN]: undefined;
  [OnboardingStackRoutes.FORGOT_PASSWORD_SCREEN]: undefined;
};

export type OnboardingStackScreenProps<
  T extends keyof OnboardingStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingStatus = await PersistenceStorage.getItem(
          KEYS.onboarding_completed,
        );
        console.log(
          'interface onboarding_completed' + onboardingStatus?.toString(),
        );
        if (onboardingStatus === 'true') {
          setInitialRoute(OnboardingStackRoutes.INTRO_QUESTION_SCREEN);
        } else {
          setInitialRoute(OnboardingStackRoutes.WELCOME_SCREEN);
        }
      } catch (error) {
        console.error('Error reading onboarding status', error);
        setInitialRoute(OnboardingStackRoutes.WELCOME_SCREEN);
      }
    };

    checkOnboardingStatus();
  }, []);
  if (!initialRoute) {
    // Render a loading screen or return null while checking the onboarding status
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName={initialRoute as keyof OnboardingStackParamList}
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
      <Stack.Screen
        name={OnboardingStackRoutes.QUESTION_ONE_SCREEN}
        component={Question1}
      />
      {/* <Stack.Screen
        name={OnboardingStackRoutes.QUESTION_TWO_SCREEN}
        component={Question2}
      /> */}
      <Stack.Screen
        name={OnboardingStackRoutes.QUESTION_THREE_SCREEN}
        component={Question3}
      />
      <Stack.Screen
        name={OnboardingStackRoutes.QUESTION_FOUR_SCREEN}
        component={Question4}
      />
      {/* <Stack.Screen
        name={OnboardingStackRoutes.QUESTION_FIVE_SCREEN}
        component={Question5}
      />
      <Stack.Screen
        name={OnboardingStackRoutes.QUESTION_SIX_SCREEN}
        component={Question6}
      /> */}
 
      <Stack.Screen
        name={OnboardingStackRoutes.THANKYOU_QA_SCREEN}
        component={ThankyouScreen}
      />

      <Stack.Screen
        name={OnboardingStackRoutes.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}

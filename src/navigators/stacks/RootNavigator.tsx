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
// import { PersistenceStorage } from '@storage/index';
// import { KEYS } from '@storage/Keys';
import { SettingsInformationScreen } from '@modules/profile/screens/Settings/Information_Screen';
import { EditProfileScreen } from '../../modules/profile/screens/Settings/EditProfile_Screen';
import { ChangePasswordScreen } from '../../modules/profile/screens/Settings/ChangePassword_Screen';
import { ReportSeizureIntro } from '../../modules/home/screens/ReportSeizureScreen/ReportSeizureIntro';
import { ReportSeizureQuestion1 } from '../../modules/home/screens/ReportSeizureScreen/ReportSeizureQuestion1';
import { ReportSeizureQuestion2 } from '../../modules/home/screens/ReportSeizureScreen/ReportSeizureQuestion2';
import { ReportSeizureQuestion3 } from '../../modules/home/screens/ReportSeizureScreen/ReportSeizureQuestion3';
import { ReportSeizureQuestion4 } from '../../modules/home/screens/ReportSeizureScreen/ReportSeizureQuestion4';
import { SeizureForecastScreen } from '@modules/seizure/screens/SeizureCalendar';
import { ScanScreen } from '@modules/wearable/screens/ScanScreen.tsx';
import { ChatBotScreen } from '@modules/chatbot/ChatBotScreen';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
/* import { useAppSelector } from '@store/index'; */
import { RootState } from '@store/index'; // Adjust the import path as necessary
import { AuthActions } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export type RootStackParamList = {
  [RootStackRoutes.TAB_STACK]: NavigatorScreenParams<TabStackParamList>;
  [RootStackRoutes.FOO_STACK]: NavigatorScreenParams<FooStackParamList>;
  [RootStackRoutes.ONBOARDING_STACK]: NavigatorScreenParams<OnboardingStackParamList>;
  [RootStackRoutes.PROFILE_SCREEN]: undefined;
  [RootStackRoutes.SETTINGS_INFORMATION_SCREEN]: undefined;
  [RootStackRoutes.EDIT_PROFILE_SCREEN]: undefined;
  [RootStackRoutes.CHANGE_PASSWORD_SCREEN]: undefined;
  [RootStackRoutes.REPORT_SEIZURE_INTRO_SCREEN]: undefined;
  [RootStackRoutes.REPORT_SEIZURE_QUESTION_ONE_SCREEN]: undefined;
  [RootStackRoutes.REPORT_SEIZURE_QUESTION_TWO_SCREEN]: undefined;
  [RootStackRoutes.REPORT_SEIZURE_QUESTION_THREE_SCREEN]: undefined;
  [RootStackRoutes.REPORT_SEIZURE_QUESTION_FOUR_SCREEN]: undefined;
  [RootStackRoutes.SEIZURE_FORCAST_SCREEN]: undefined;
  [RootStackRoutes.SCAN_SCREEN]: undefined;
  [RootStackRoutes.HOME]: undefined;
  [RootStackRoutes.CHATBOT]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  //const { login } = useAuth();
  // const isLoggedIn = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  //const isLoggedIn = false;

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);

      if (token) {
        dispatch(AuthActions.loginSuccess()); // Automatically log in if the token exists
      }

      console.log('token root ', token);
    };

    checkLoginStatus();
  }, [dispatch]);

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

      <Stack.Screen
        name={RootStackRoutes.REPORT_SEIZURE_INTRO_SCREEN}
        component={ReportSeizureIntro}
      />
      <Stack.Screen
        name={RootStackRoutes.REPORT_SEIZURE_QUESTION_ONE_SCREEN}
        component={ReportSeizureQuestion1}
      />
      <Stack.Screen
        name={RootStackRoutes.REPORT_SEIZURE_QUESTION_TWO_SCREEN}
        component={ReportSeizureQuestion2}
      />
      <Stack.Screen
        name={RootStackRoutes.REPORT_SEIZURE_QUESTION_THREE_SCREEN}
        component={ReportSeizureQuestion3}
      />
      <Stack.Screen
        name={RootStackRoutes.REPORT_SEIZURE_QUESTION_FOUR_SCREEN}
        component={ReportSeizureQuestion4}
      />
      <Stack.Screen
        name={RootStackRoutes.SEIZURE_FORCAST_SCREEN}
        component={SeizureForecastScreen}
      />
      <Stack.Screen name={RootStackRoutes.SCAN_SCREEN} component={ScanScreen} />
      <Stack.Screen name={RootStackRoutes.CHATBOT} component={ChatBotScreen} />
    </Stack.Navigator>
  );
}

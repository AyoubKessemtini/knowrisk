import { Colors } from '@constants/Colors';
import {
  NavigatorScreenParams,
  useFocusEffect,
} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { navigatorConfig } from '../navigatorConfigs';
import { RootStackRoutes } from '../routes';
import { FooStackParamList } from './FooNavigator';
import { TabNavigator, TabStackParamList } from './TabNavigator';
import {
  OnboardingNavigator,
  OnboardingStackParamList,
} from './OnboardingNavigator';
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
import { JournalScreen } from '@modules/journal/screens/journal.tsx';
import { HeartRateDetailsScreen } from '@modules/heartRateDetails/screens/heartRateDetails.tsx';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { RootState } from '@store/index'; // Adjust the import path as necessary
import { AuthActions } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StressScreen } from '@modules/stress/screens/StressScreen.tsx';
import SetProfilFormScreen from '@modules/home/screens/SetProfil/setProfile';

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
  [RootStackRoutes.JOURNAL]: undefined;
  [RootStackRoutes.HEART_RATE_DETAILS]: undefined;
  [RootStackRoutes.STRESS_SCREEN]: undefined;
  [RootStackRoutes.SetProfil_FormScreen]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const profileUpdateStatus = useSelector(
    (state: RootState) => state.profile.successMessage,
  );

  const onbordingUpdateStatus = useSelector(
    (state: RootState) => state.auth.successMessage,
  );
  const loginSuccess = useSelector(
    (state: RootState) => state.auth.loginSuccess,
  ); // To listen for login success

  const [isProfileSet, setIsProfileSet] = useState<boolean | null>(null);
  // const [isOnbordSet, setIsOnbordSet] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
      if (token) {
        dispatch(AuthActions.loginSuccess());
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  // Check profile setup status whenever the profile update status changes

  useEffect(() => {
    const checkProfileSetupStatus = async () => {
      if (isLoggedIn || loginSuccess) {
        const profileSetupStatus = await PersistenceStorage.getItem(
          KEYS.IS_PROFILE_SET,
        );
        setIsProfileSet(profileSetupStatus === 'true');
      } else {
        setIsProfileSet(false); // Reset isProfileSet on logout
      }
    };

    checkProfileSetupStatus();

    // Recheck whenever profile is successfully updated
    if (profileUpdateStatus && isLoggedIn) {
      checkProfileSetupStatus();
    }

    console.log('update is_profile_set', isProfileSet?.toString());
  }, [isLoggedIn, loginSuccess, profileUpdateStatus]); // Added isLoggedIn dependency

  // Check oborif setup status whenever the profile update status changes
  // useEffect(() => {
  //   const checkOnbordingSetupStatus = async () => {
  //     const onbordSetupStatus = await PersistenceStorage.getItem(
  //       KEYS.onboarding_completed,
  //     );
  //     setIsOnbordSet(onbordSetupStatus === 'true');
  //   };
  //   // Check initially on app start
  //   checkOnbordingSetupStatus();

  //   // Recheck whenever profile is successfully updated
  //   if (onbordingUpdateStatus) {
  //     checkOnbordingSetupStatus();
  //   }
  //   console.log('update onboarding_completed' + isOnbordSet?.toString());
  // }, [onbordingUpdateStatus]);
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
          {isProfileSet ? (
            <Stack.Screen
              name={RootStackRoutes.TAB_STACK}
              component={TabNavigator}
            />
          ) : (
            <Stack.Screen
              name={RootStackRoutes.ONBOARDING_STACK}
              component={OnboardingNavigator}
            />
          )}
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
      <Stack.Screen name={RootStackRoutes.JOURNAL} component={JournalScreen} />
      <Stack.Screen
        name={RootStackRoutes.STRESS_SCREEN}
        component={StressScreen}
      />
      <Stack.Screen
        name={RootStackRoutes.HEART_RATE_DETAILS}
        component={HeartRateDetailsScreen}
      />
      <Stack.Screen
        name={RootStackRoutes.SetProfil_FormScreen}
        component={SetProfilFormScreen}
      />
    </Stack.Navigator>
  );
}

import { CButton } from '@components/Buttons/CButton'; // version 3 of CButton
import { Screen } from '@components/Screen';
import { useAuth } from '@hooks/useAuth';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CImage } from '../../../../components/CImage';
import ImageAssets from '@assets/images';
import { Header } from '@components/Headers/Header';
import { CText } from '@components/CText';

export const Profile = ({}: TabStackScreenProps<'profile'>): JSX.Element => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  return (
    <Screen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <Header hasBackButton text="profile.profile" />
      <View style={styles.profileHeader}>
        <CImage source={ImageAssets.PICCOLO} height={55} width={55} />
        <View style={styles.profileInfo}>
          <CText size="lg_medium" color="purple">
            George Frank
          </CText>
          <CText size="sm_medium" color="purpleGrey">
            Georgefrank@gmail.com
          </CText>
        </View>
      </View>

      {/* User Account Section */}
      <View style={styles.section}>
        <CText size="lg_medium" color="purple1" text="profile.user_account" />
        <CButton
          mt={10}
          text="profile.edit_profile"
          buttonType="primary"
          buttonVersion={2}
          onPress={() => {
            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.QUESTION_ONE_SCREEN,
            });
          }}
        />
      </View>

      {/* Application Settings Section */}
      <View style={styles.section}>
        <CText
          size="lg_medium"
          color="purple1"
          text="profile.application_settings"
        />
        <CButton
          mt={10}
          text="profile.information"
          buttonType="primary"
          buttonVersion={2}
          onPress={() => {
            navigation.navigate(RootStackRoutes.SETTINGS_INFORMATION_SCREEN);
          }}
        />
        <CButton
          text="profile.change_password"
          buttonType="primary"
          buttonVersion={2}
          onPress={() => {
            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.QUESTION_ONE_SCREEN,
            });
          }}
        />
        <CButton
          text="profile.emergency_call"
          buttonType="primary"
          buttonVersion={2}
          onPress={() => {
            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.QUESTION_ONE_SCREEN,
            });
          }}
        />
        <CButton
          text="onboarding.terms_and_conditions"
          buttonType="primary"
          buttonVersion={2}
          onPress={() => {
            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.QUESTION_ONE_SCREEN,
            });
          }}
        />
      </View>

      {/* Help Center Section */}

      <CButton
        mt={20}
        text="profile.help_center"
        buttonType="primary"
        buttonVersion={2}
        onPress={async () => {
          await logout();
          await navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
            screen: OnboardingStackRoutes.LOGIN_SCREEN,
          });
        }}
      />

      {/* Logout Button */}
      <CButton
        mt={20}
        buttonVersion={3}
        buttonType="primary"
        text="common.logout"
        onPress={async () => {
          await logout();
          await navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
            screen: OnboardingStackRoutes.LOGIN_SCREEN,
          });
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  section: {
    marginBottom: 25,
  },
});

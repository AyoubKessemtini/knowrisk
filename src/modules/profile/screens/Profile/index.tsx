import React from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { CText } from '@components/CText';
import Icon from 'react-native-easy-icon';
import { Colors } from '@constants/Colors';
import HelpCenterButton from '@components/Buttons/HelpCenterButton';
import { CButton } from '@components/Buttons/CButton';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import { useNavigation } from '@react-navigation/native';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { AuthActions } from '@store/authSlice';
import { RootState } from '@store/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileActions } from '@store/profileSlice';

export const Profile = ({}: TabStackScreenProps<'profile'>): JSX.Element => {
  const handleLogout = async () => {
    await PersistenceStorage.removeItem(KEYS.USER_DATA); // Clear user data
    await PersistenceStorage.removeItem(KEYS.ACCESS_TOKEN);
    await PersistenceStorage.removeItem(KEYS.onboarding_completed); // Clear user data
    await PersistenceStorage.removeItem(KEYS.USER_DATA); // Clear user data

    await PersistenceStorage.setItem(KEYS.IS_PROFILE_SET, 'false');

    await PersistenceStorage.removeItem(KEYS.IS_PROFILE_SET); // Clear user data
    await PersistenceStorage.clearAll();
    dispatch(ProfileActions.resetProfileState());

    dispatch(AuthActions.logout()); // Dispatch logout action
    navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
      screen: OnboardingStackRoutes.LOGIN_SCREEN,
    });
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // User's name

  // const backgroundColor = getBackgroundColor(firstName + lastName);
  const user = useSelector((state: RootState) => state.auth.user);
  const getFirstNameAndLastName = (
    username: string,
  ): { firstName: string; lastName: string } => {
    const [firstName, lastName] = username.split('.');
    return {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
    };
  };
  // Fallback values if user data is not available
  const { firstName, lastName } = getFirstNameAndLastName(
    user ? user.username : 'Alex.Lo',
  );

  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);

      if (userData) {
        // Parse the user data and dispatch to Redux
        const user = JSON.parse(userData);
        dispatch(AuthActions.setUser(user)); // Store user data in Redux
      }

      console.log('USER_DATA root ', userData);
    };

    checkLoginStatus();
  }, [dispatch]);
  return (
    <Screen fullscreen withoutTopEdge noHorizontalPadding>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View
            style={[
              styles.initialsContainer,
              { backgroundColor: Colors.cosmos },
            ]}
          >
            <CText size="xl_bold" color="white">
              {initials}
            </CText>
          </View>
          <View style={styles.profileInfo}>
            <CText size="lg_medium" color="purple">
              {firstName} {lastName}
            </CText>
            <CText size="sm_medium" color="purpleGrey">
              {user?.email || 'Email not available'}
            </CText>
          </View>
        </View>

        {/* User Account Section */}
        <View style={styles.section}>
          <CText size="lg_medium" color="purple1" text="profile.user_account" />
          <CButton
            mt={10}
            text="profile.edit_profile"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.EDIT_PROFILE_SCREEN);
            }}
          />
        </View>

        <View style={styles.section}>
          <CText
            size="lg_medium"
            color="purple1"
            text="profile.application_settings"
          />
          <CButton
            mt={10}
            text="profile.information"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.SETTINGS_INFORMATION_SCREEN);
            }}
          />
          <CButton
            text="profile.guide"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.Gif_INTRO_GUIDE);
            }}
          />
          <CButton
            text="profile.invite_doctor"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.INVITE_DOCTOR);
            }}
          />
          <CButton
            text="profile.change_password"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.CHANGE_PASSWORD_SCREEN);
            }}
          />
          <CButton
            text="profile.emergency_call"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.EMERGENCY_SCREEN);
            }}
          />
          <CButton
            text="onboarding.terms_and_conditions"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.WEB_VIEW_SCREEN, {
                url: 'https://www.knowlepsy.com/personal-data-policy',
              });
            }}
          />
          <CButton
            text="profile.disclaimer"
            buttonType="magnolia"
            buttonVersion={2}
            rightAccessory={
              <Icon
                type="material"
                name="chevron-right"
                size={21}
                color={Colors.fog}
              />
            }
            onPress={() => {
              navigation.navigate(RootStackRoutes.WEB_VIEW_SCREEN, {
                url: 'https://www.knowlepsy.com/disclaimer',
                title:'Disclaimer'
              });
            }}
          />
        </View>

        <HelpCenterButton
          onPress={async () => {
            const email = 'mailto:contact@knowlepsy.com';
            try {
              const supported = await Linking.canOpenURL(email);
              if (supported) {
                await Linking.openURL(email);
              } else {
                Alert.alert(
                  'Error',
                  'Your device does not support this action.',
                );
              }
            } catch (error) {
              console.error('Failed to send email:', error);
            }
          }}
        />

        <CButton
          mt={20}
          buttonVersion={3}
          buttonType="cosmos"
          text="common.logout"
          leftAccessory={
            <Icon
              type="material"
              name="logout"
              size={21}
              color={Colors.brick}
            />
          }
          onPress={async () => {
            await handleLogout();
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  profileHeader: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  initialsContainer: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  section: {
    marginBottom: 25,
  },
});

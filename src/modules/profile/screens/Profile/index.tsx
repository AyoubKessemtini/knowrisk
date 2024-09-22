import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import Icon from 'react-native-easy-icon';
import { Colors } from '@constants/Colors';
import HelpCenterButton from '@components/Buttons/HelpCenterButton';
import { CButton } from '@components/Buttons/CButton';
import { Screen } from '@components/Screen';
import { useAuth } from '@hooks/useAuth';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import { Header } from '@components/Headers/Header';
import { useNavigation } from '@react-navigation/native';

// const getBackgroundColor = (name: string) => {
//   const hash = Array.from(name).reduce(
//     (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
//     0,
//   );
//   return `hsl(${hash % 360}, 70%, 80%)`;
// };

export const Profile = ({}: TabStackScreenProps<'profile'>): JSX.Element => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  // User's name
  const firstName = 'Firas'; // Replace with actual user data
  const lastName = 'Rhaeim'; // Replace with actual user data
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  // const backgroundColor = getBackgroundColor(firstName + lastName);

  return (
    <Screen fullscreen withoutTopEdge noHorizontalPadding>
      <Header hasBackButton text="profile.profile" />
      <View style={styles.line} />
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
              firasrhaeim@gmail.com
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
              navigation.navigate(RootStackRoutes.SETTINGS_INFORMATION_SCREEN);
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
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.QUESTION_ONE_SCREEN,
              });
            }}
          />
        </View>

        <HelpCenterButton onPress={() => {}} />

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
            await logout();
            await navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.LOGIN_SCREEN,
            });
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
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderColor: Colors.fog,
  },
});

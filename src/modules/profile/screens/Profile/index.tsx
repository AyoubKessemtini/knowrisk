import { CButton } from '@components/Buttons/CButton';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { useAuth } from '@hooks/useAuth';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const Profile = ({}: TabStackScreenProps<'profile'>): JSX.Element => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  return (
    <Screen containerStyles={styles.container}>
      <Text style={styles.textStyle}>PROFILE</Text>
      <CButton
        mt={50}
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
  textStyle: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
  },
});

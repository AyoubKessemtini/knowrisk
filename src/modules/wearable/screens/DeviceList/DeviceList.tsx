import { CButton } from '@components/Buttons/CButton';
import { Screen } from '@components/Screen';
import { useAuth } from '@hooks/useAuth';
import { BleutoothStateButton } from '@modules/wearable/components/BleutoothStateButton';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

export const DeviceList = ({}: TabStackScreenProps<'device_list'>) => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  return (
    <Screen containerStyles={styles.container}>
      <BleutoothStateButton
        connected
        onPress={() => {
          console.log('switched');
        }}
      />
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
  },
});

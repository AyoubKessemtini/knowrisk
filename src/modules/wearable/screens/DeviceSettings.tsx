import { CButton } from '@components/Buttons/CButton.tsx';
import { Screen } from '@components/Screen.tsx';
import { BleutoothStateButton } from '@modules/wearable/components/BleutoothStateButton.tsx';
import { RootStackRoutes } from '@navigators/routes.ts';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator.tsx';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { DisconnectedCard } from '@modules/wearable/components/DisconnectedCard.tsx';
import Icon from 'react-native-easy-icon';

export const DeviceSettings = ({}: TabStackScreenProps<'device_settings'>) => {
  const navigation = useNavigation();
  return (
    <Screen containerStyles={styles.container}>
      <BleutoothStateButton
        connected
        onPress={() => {
          console.log('switched');
        }}
      />
      <DisconnectedCard />
      <CButton
        mt={10}
        text="wearable.scan_device"
        leftAccessory={
          <Icon type="ionicon" name="watch-outline" size={24} color="white" />
        }
        onPress={async () => {
          await navigation.navigate(RootStackRoutes.SCAN_SCREEN);
        }}
      />
      <CButton
        mt={10}
        onPress={async () => {
          console.log('get data');
        }}
      >
        Get data
      </CButton>
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

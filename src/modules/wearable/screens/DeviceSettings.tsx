import { CButton } from '@components/Buttons/CButton.tsx';
import { Screen } from '@components/Screen.tsx';
import { BleutoothStateButton } from '@modules/wearable/components/BleutoothStateButton.tsx';
import { RootStackRoutes } from '@navigators/routes.ts';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator.tsx';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DisconnectedCard } from '@modules/wearable/components/DisconnectedCard.tsx';
import Icon from 'react-native-easy-icon';
import { useAppDispatch, useAppSelector } from '@store/index.ts';
import { ConnectedCard } from '@modules/wearable/components/ConnectedCard.tsx';
import { disconnectFromDevice } from '@utils/wearable/disconnectFromDevice.ts';

export const DeviceSettings = ({}: TabStackScreenProps<'device_settings'>) => {
  const navigation = useNavigation();
  const { isDeviceConnectedBLE, deviceId, deviceName } = useAppSelector(
    (state) => state.bleData,
  );
  const dispatch = useAppDispatch();

  if (!isDeviceConnectedBLE) {
    return (
      <Screen containerStyles={styles.container}>
        <BleutoothStateButton
          connected={false}
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
      </Screen>
    );
  } else {
    return (
      <Screen containerStyles={styles.container}>
        <BleutoothStateButton
          connected
          onPress={() => {
            console.log('switched');
          }}
        />
        <ConnectedCard deviceName={deviceName} />

        <View style={styles.buttonsContainer}>
          <CButton
            text="wearable.reset_device"
            rightAccessory={
              <Icon
                type="ionicon"
                name="refresh-outline"
                size={24}
                color="white"
              />
            }
          />
          <CButton
            text="wearable.unpair_device"
            rightAccessory={
              <Icon
                type="ionicon"
                name="log-out-outline"
                size={24}
                color="white"
              />
            }
            onPress={() => disconnectFromDevice(deviceId, dispatch)}
          />
        </View>
      </Screen>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
});

import { CButton } from '@components/Buttons/CButton.tsx';
import { Screen } from '@components/Screen.tsx';
import { BleutoothStateButton } from '@modules/wearable/components/BleutoothStateButton.tsx';
import { RootStackRoutes } from '@navigators/routes.ts';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator.tsx';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { DisconnectedCard } from '@modules/wearable/components/DisconnectedCard.tsx';
import Icon from 'react-native-easy-icon';
import { RootState, useAppDispatch, useAppSelector } from '@store/index.ts';
import { ConnectedCard } from '@modules/wearable/components/ConnectedCard.tsx';
import { disconnectFromDevice } from '@utils/wearable/disconnectFromDevice.ts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const DeviceSettings = ({}: TabStackScreenProps<'device_settings'>) => {
  const navigation = useNavigation();
  const { isDeviceConnectedBLE, deviceId, deviceName } = useAppSelector(
    (state: RootState) => state.bleData,
  );
  const dispatch = useAppDispatch();

  const checkBluetoothPermission = async () => {
    if (Platform.OS === 'android') {
      // Check for Android permissions
      if (Platform.Version >= 31) {
        const scanGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        );
        const connectGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        );

        if (!scanGranted || !connectGranted) {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ]);

          return (
            granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
              PermissionsAndroid.RESULTS.GRANTED
          );
        }
      } else {
        // For Android < 31, check location permissions
        const locationGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (!locationGranted) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      }
      return true;
    } else if (Platform.OS === 'ios') {
      // Check for iOS permissions
      const bluetoothPermission = await check(PERMISSIONS.IOS.BLUETOOTH);
      console.log('bluetoothPermission');
      console.log(bluetoothPermission);
      if (bluetoothPermission !== RESULTS.GRANTED) {
        const granted = await request(PERMISSIONS.IOS.BLUETOOTH);
        return granted === RESULTS.GRANTED;
      }
      return true;
    }
  };

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
            const hasPermission = await checkBluetoothPermission();
            if (hasPermission) {
              await navigation.navigate(RootStackRoutes.SCAN_SCREEN);
            } else {
              Alert.alert(
                'Permission Required',
                'Bluetooth permissions are required to scan for devices. Please enable them in your device settings.',
              );
            }
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

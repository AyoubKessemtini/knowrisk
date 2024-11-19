import { useEffect, useState } from 'react';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Platform,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { setTimeOnDevice } from '@utils/wearable/time/setTimeOnDevice.ts';
import { enableRealtimeMode } from '@utils/wearable/enableRealtimeMode.ts';
import { readRealTimeData } from '@utils/wearable/readRealtimeData.ts';
import {
  DataType,
  sendRequestDataCommand,
} from '@utils/wearable/requestData.ts';
import { useAppDispatch, useAppSelector } from '@store/index.ts';
import { BleDataActions } from '@store/bleDataSlice.ts';
import { RootState } from '@store/index';

interface Peripheral {
  id: string;
  name?: string;
  advertising?: never;
  rssi?: number;
}

export const useBle = () => {
  const [devices, setDevices] = useState<Peripheral[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Peripheral>(
    {} as Peripheral,
  );
  const dispatch = useAppDispatch();
  console.log(connectedDevice);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isBluetoothOn, setIsBluetoothOn] = useState<boolean>(true);
  const [hadFirstConnection, setHadFirstConnection] = useState<boolean>(false);

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const { isDeviceConnectedBLE } = useAppSelector(
    (state: RootState) => state.bleData,
  );

  if (!BleManagerModule) {
    console.error('BleManager native module is not available.');
    return {
      devices: [],
      isScanning: false,
      startScan: () => {},
      connectToDevice: () => {},
    };
  }
  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    console.log('Discovered peripheral:', peripheral);
    setDevices((prevDevices) => {
      const deviceExists = prevDevices.some(
        (device) => device.id === peripheral.id,
      );
      if (!deviceExists) {
        return [...prevDevices, peripheral];
      }
      return prevDevices;
    });
  };

  const handleStopScan = () => {
    setIsScanning(false);
    console.log('Scanning stopped');
  };

  const handleBleStateChange = (state: string) => {
    console.log('Bluetooth state changed:', state);
    if (state === 'off') {
      setIsBluetoothOn(false);
      dispatch(BleDataActions.reset());
      Alert.alert(
        'Bluetooth Required',
        'Please turn on Bluetooth to use this feature.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    } else if (state === 'on') {
      setIsBluetoothOn(true);
    } else if (state === 'unknown') {
      console.log('Bluetooth state is unknown, retrying in 2 seconds...');
      // Retry checking the Bluetooth state after 2 seconds if it's unknown
      setTimeout(() => BleManager.checkState(), 2000);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Bluetooth Low Energy requires location permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.error('Location permission denied');
        return false;
      }
    }
    return true;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const initializeBleManager = async () => {
      const hasPermissions = await requestPermissions();
      console.log('Location permission granted:', hasPermissions);
      if (hasPermissions) {
        BleManager.start({ showAlert: false })
          .then(() => {
            console.log('BleManager initialized');
            BleManager.checkState(); // Check initial Bluetooth state
          })
          .catch((error) => {
            console.error('BleManager initialization error:', error);
          });
      }
    };

    initializeBleManager();

    // Listen for Bluetooth state changes
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateState',
      handleBleStateChange,
    );

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDidUpdateState');
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, []);

  const startScan = async () => {
    if (isScanning) return;
    if (!isBluetoothOn) {
      Alert.alert(
        'Bluetooth is Off',
        'Please turn on Bluetooth to start scanning.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
      return;
    }
    const hasPermissions = await requestPermissions();
    console.log('Scanning permission granted:', hasPermissions);
    if (!hasPermissions) return;

    setDevices([]); // Clear device list

    // Add a slight delay before starting the scan
    setTimeout(async () => {
      setIsScanning(true);
      try {
        await BleManager.scan([], 5, false);
        console.log('Scanning started');
      } catch (err) {
        console.error('Scanning error:', err);
        setIsScanning(false);
      }
    }, 1000); // 1-second delay
  };

  const connectToDevice = async (id: string) => {
    try {
      await BleManager.connect(id);
      setConnectedDevice(devices.filter((d) => d.id === id)[0]);
      console.log('Connected to device:', id);
      await BleManager.retrieveServices(id);
      dispatch(BleDataActions.updateDeviceConnection(true));
      dispatch(BleDataActions.updateDeviceId(id));
      if (devices.filter((d) => d.id === id)[0].name != null) {
        dispatch(
          BleDataActions.updateDeviceName(
            devices.filter((d) => d.id === id)[0].name ?? 'Knowlepsy device',
          ),
        );
      }
      setHadFirstConnection(true);
      setTimeout(async () => {
        await setTimeOnDevice(id, 'fff0', 'fff6');
        //await
        await enableRealtimeMode(id, 'fff0', 'fff6');
        await readRealTimeData(id, 'fff0', 'fff7', dispatch);
        await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.HR);
        await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.HRV);
        await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.TEMP);
        await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.SPO2);
        await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.SLEEP);
        await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.BATTERY);
      }, 3000);
      if (!hadFirstConnection) {
        setInterval(async () => {
          if (isDeviceConnectedBLE) {
            await enableRealtimeMode(id, 'fff0', 'fff6');
            //Read historical data
            await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.HR);
            await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.HRV);
            await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.TEMP);
            await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.SPO2);
            await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.SLEEP);
            await sendRequestDataCommand(id, 'fff0', 'fff6', DataType.BATTERY);
          }
        }, 30000);
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return {
    devices,
    isScanning,
    startScan,
    connectToDevice,
  };
};

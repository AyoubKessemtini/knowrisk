import { useState, useEffect } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Alert,
  Platform,
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { setTimeOnDevice } from '@utils/wearable/SetTimeOnDevice.ts';

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
  console.log(connectedDevice);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isBluetoothOn, setIsBluetoothOn] = useState<boolean>(true); // Track Bluetooth state

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
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
      setTimeout(async () => {
        await setTimeOnDevice(id, 'fff0', 'fff6');
      }, 3000);
      console.log('await BleManager.retrieveServices(id)');
      console.log(
        JSON.stringify(await BleManager.retrieveServices(id), null, 2),
      );
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

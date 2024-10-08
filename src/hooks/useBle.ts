import { useState } from 'react';
import { BleManager, Device } from 'react-native-ble-plx';

const bleManager = new BleManager();

interface BluetoothLowEnergyApi {
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  allDevices: Device[];
  connectedDevice: Device | null;
}

export function useBle(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  // Function to check for duplicate devices
  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  // Function to scan for BLE devices
  const scanForPeripherals = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }

      if (device) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  // Function to connect to a selected BLE device
  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      await bleManager.stopDeviceScan();
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  return {
    scanForPeripherals,
    connectToDevice,
    allDevices,
    connectedDevice,
  };
}

/*
import { useState, useEffect } from 'react';
import { NativeEventEmitter, NativeModules, Alert, Platform, PermissionsAndroid } from 'react-native';
import BleManager from 'react-native-ble-manager';

interface Peripheral {
  id: string;
  name?: string;
  advertising?: never;
  rssi?: number;
}

export const useBle = () => {
  const [devices, setDevices] = useState<Peripheral[]>([]);
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
      console.log('Bluetooth state is unknown, waiting for a valid state...');
    }
  };

  useEffect(() => {
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('BleManager initialized');
        BleManager.checkState(); // Check initial Bluetooth state
      })
      .catch((error) => {
        console.error('BleManager initialization error:', error);
      });

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
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.error('Location permission denied');
        return false;
      }
    }
    return true;
  };

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
    if (!hasPermissions) return;

    setDevices([]); // Clear device list
    setIsScanning(true);
    try {
      await BleManager.scan([], 35, false);
      console.log('Scanning started');
    } catch (err) {
      console.error('Scanning error:', err);
      setIsScanning(false);
    }
  };

  const connectToDevice = async (id: string) => {
    try {
      await BleManager.connect(id);
      console.log('Connected to device:', id);
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
 */

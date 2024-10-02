import { useState, useEffect, useCallback } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import BleManager from 'react-native-ble-manager';

interface Peripheral {
  id: string;
  name?: string;
  advertising?: never;
  rssi?: number;
  // Add other properties if necessary
}

export const useBle = () => {
  const [devices, setDevices] = useState<Peripheral[]>([]); // List of scanned devices
  const [isScanning, setIsScanning] = useState<boolean>(false); // Scanning state

  // Obtain the BleManager native module
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  // Handler for discovered devices
  const handleDiscoverPeripheral = useCallback(
    (peripheral: Peripheral) => {
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
    },
    [setDevices],
  );

  // Handler for scan stop event
  const handleStopScan = useCallback(() => {
    setIsScanning(false);
    console.log('Scanning stopped');
  }, []);

  useEffect(() => {
    // Start BleManager
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('BleManager initialized');
      })
      .catch((error) => {
        console.error('BleManager initialization error:', error);
      });

    // Add event listeners
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

    // Cleanup function
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, [handleDiscoverPeripheral, handleStopScan]);

  // Function to start scanning
  const startScan = async () => {
    if (isScanning) return;

    // Request permissions on Android

    setDevices([]); // Clear device list
    setIsScanning(true);

    // Start scanning
    try {
      await BleManager.scan([], 5, false);
      console.log('Scanning started');
    } catch (err) {
      console.error('Scanning error:', err);
      setIsScanning(false);
    }
  };

  // Function to connect to a device
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

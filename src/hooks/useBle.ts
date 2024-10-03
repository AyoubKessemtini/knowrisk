import { useState, useEffect, useCallback } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
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
  const BleManagerModule = NativeModules.BleManager;
  if (!BleManagerModule) {
    console.error('BleManager native module is not available.');
    return {
      devices: [],
      isScanning: false,
      startScan: () => {},
      connectToDevice: () => {},
    };
  }
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleStopScan = useCallback(() => {
    setIsScanning(false);
    console.log('Scanning stopped');
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('BleManager initialized');
      })
      .catch((error) => {
        console.error('BleManager initialization error:', error);
      });
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
    };
  }, [handleDiscoverPeripheral, handleStopScan]);

  // Function to start scanning
  const startScan = async () => {
    if (isScanning) return;
    setDevices([]); // Clear device list
    setIsScanning(true);
    try {
      await BleManager.scan([], 15, false);
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

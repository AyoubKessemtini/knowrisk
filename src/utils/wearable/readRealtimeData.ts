import BleManager, { BleEventType } from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { DataType } from '@utils/wearable/requestData.ts';
import { parseHRVData } from '@utils/wearable/dataParser/parseHRVData.ts';
import { parseRealTimeActivities } from '@utils/wearable/dataParser/parseRealTimeActivities.ts';
import { parseSleepData } from '@utils/wearable/dataParser/parseSleepData.ts';
import { parseHeartRateData } from '@utils/wearable/dataParser/parseHeartRateData.ts';
import { parseSPO2Data } from '@utils/wearable/dataParser/parseSPO2Data.ts';
import { parseTemperatureData } from '@utils/wearable/dataParser/parseTemperatureData.ts';
import { parseBatteryData } from '@utils/wearable/dataParser/parseBatteryData.ts';
import { AppDispatch } from '@store/index.ts';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

if (!BleManagerModule) {
  console.error('BleManager native module is not available.');
}

// Main function to read real-time data
export const readRealTimeData = async (
  deviceId: string,
  serviceUUID: string,
  characteristicUUID: string,
  dispatch: AppDispatch,
) => {
  try {
    await BleManager.startNotification(
      deviceId,
      serviceUUID,
      characteristicUUID,
    );
    bleManagerEmitter.addListener(
      BleEventType.BleManagerDidUpdateValueForCharacteristic,
      ({ value }) => {
        (async () => {
          try {
            if (value.length > 16) {
              const decodedData = Buffer.from(value, 'base64');
              await parseRealTimeData(decodedData, deviceId, dispatch);
            }
          } catch (error) {
            console.error('Error in listener:', error);
          }
        })();
      },
    );

    console.log('Subscribed to real-time data!');
  } catch (error) {
    console.error('Error subscribing to real-time data:', error);
  }
};

// Main data parser function
const parseRealTimeData = (
  data: Buffer | Uint8Array,
  deviceId: string,
  dispatch: AppDispatch,
) => {
  try {
    const dataView: DataView = new DataView(data.buffer);
    const startByte = dataView.getUint8(0);

    switch (startByte) {
      case DataType.HRV:
        parseHRVData(dataView, deviceId);
        break;

      case DataType.ACTIVITIES:
        parseRealTimeActivities(dataView, dispatch);
        break;

      case DataType.SLEEP:
        parseSleepData(dataView, deviceId);
        break;

      case DataType.HR:
        parseHeartRateData(dataView);
        break;

      case DataType.SPO2:
        parseSPO2Data(dataView, deviceId);
        break;

      case DataType.TEMP:
        parseTemperatureData(dataView, deviceId);
        break;

      case DataType.BATTERY:
        parseBatteryData(dataView);
        break;

      default:
        console.warn(`Unknown start byte: ${startByte}`);
        break;
    }
  } catch (error) {
    console.error('Error in parseRealTimeData:', error);
  }
};

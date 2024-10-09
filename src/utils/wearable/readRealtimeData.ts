import BleManager, { BleEventType } from 'react-native-ble-manager';
import { Buffer } from 'buffer';
import { NativeEventEmitter, NativeModules } from 'react-native';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

if (!BleManagerModule) {
  console.error('BleManager native module is not available.');
}
export const readRealTimeData = async (
  deviceId: string,
  serviceUUID: string,
  characteristicUUID: string,
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
        try {
          const decodedData = Buffer.from(value, 'base64');
          parseRealTimeData(decodedData);
        } catch (error) {
          console.error('Error decoding Base64 data:', error);
        }
      },
    );
    console.log('Subscribed to real-time data!');
  } catch (error) {
    console.error('Error subscribing to real-time data:', error);
  }
};

const parseRealTimeData = (data: Buffer) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const dataView = new DataView(data.buffer);
  let offset = 0;

  const startByte = dataView.getUint8(offset);
  offset += 1;

  if (startByte !== 0x09) {
    console.error('Verification error or execution failed.');
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getUint32LE = (offset: number) => {
    const value = dataView.getUint32(offset, true); // true for little-endian
    return value;
  };
  const totalSteps = getUint32LE(offset);
  offset += 4;

  const calorieValueRaw = getUint32LE(offset);
  const calorieValue = (calorieValueRaw / 100).toFixed(2); // Keep two decimal places
  offset += 4;

  const distanceRaw = getUint32LE(offset);
  const walkingDistance = (distanceRaw / 100).toFixed(2); // Keep two decimal places
  offset += 4;

  const movementTimeRaw = getUint32LE(offset);
  const movementMinutes = Math.floor(movementTimeRaw / 60);
  const movementSeconds = movementTimeRaw % 60;
  offset += 4;

  const fastMotionTimeRaw = getUint32LE(offset);
  const fastMotionMinutes = fastMotionTimeRaw;
  offset += 4;

  const heartRate = dataView.getUint8(offset);
  offset += 1;

  const temperatureRaw = dataView.getUint16(offset, true);
  const temperature = (temperatureRaw / 100).toFixed(2);
  offset += 2;

  const bloodOxygen = dataView.getUint8(offset);
  offset += 1;

  console.log('Total Steps:', totalSteps);
  console.log('Calorie Value (KCAL):', calorieValue);
  console.log('Walking Distance (KM):', walkingDistance);
  console.log(
    'Movement Time:',
    `${movementMinutes} minutes and ${movementSeconds} seconds`,
  );
  console.log('Fast Motion Time (minutes):', fastMotionMinutes);
  console.log('Heart Rate:', heartRate);
  console.log('Temperature (°C):', temperature);
  console.log('Blood Oxygen Value (%):', bloodOxygen);
};

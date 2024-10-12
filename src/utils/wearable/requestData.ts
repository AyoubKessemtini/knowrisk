import BleManager from 'react-native-ble-manager';
import { calculateCRC } from '@utils/wearable/shared/shredUtils.ts';
import { enableRealtimeMode } from '@utils/wearable/enableRealtimeMode.ts'; // Import buffer to convert the data

export enum DataType {
  SLEEP = 0x53,
  HR = 0x54,
  HRV = 0x56,
  SPO2 = 0x66,
  TEMP = 0x62,
  ACTIVITIES = 0x09,
}
const getDataCommand = (dataType: DataType) => {
  const data = [
    dataType,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
  ];
  data[15] = calculateCRC(data.slice(0, 15));
  return data;
};

export const sendRequestDataCommand = async (
  deviceId: string,
  serviceUUID: string,
  characteristicUUID: string,
  dataType: DataType,
) => {
  try {
    const data = getDataCommand(dataType);
    await BleManager.write(deviceId, serviceUUID, characteristicUUID, data);
    console.log(`${dataType} request sent successfully!`);
    await enableRealtimeMode(deviceId, 'fff0', 'fff6');
  } catch (error) {
    console.error(`Error sending ${dataType} request command:`, error);
  }
};

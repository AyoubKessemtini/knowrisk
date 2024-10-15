import BleManager from 'react-native-ble-manager';
import { calculateCRC } from '@utils/wearable/shared/shredUtils.ts';
import { enableRealtimeMode } from '@utils/wearable/enableRealtimeMode.ts';
import { DataType } from '@utils/wearable/requestData.ts'; // Import buffer to convert the data

const requestDeleteDataCommand = (dataType: DataType) => {
  const data = [
    dataType,
    0x99,
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

  data[15] = calculateCRC(data.slice(0, 15)); // Append CRC as the last byte

  return data;
};

export const deleteData = async (deviceId: string, dataType: DataType) => {
  try {
    const data = requestDeleteDataCommand(dataType);
    await BleManager.write(deviceId, 'fff0', 'fff6', data);
    console.log(`Delete ${dataType} request sent successfully!`);
    await enableRealtimeMode(deviceId, 'fff0', 'fff6');
  } catch (error) {
    console.error('Error sending delete sleep request command:', error);
  }
};

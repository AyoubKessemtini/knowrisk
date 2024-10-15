import BleManager from 'react-native-ble-manager';
import { calculateCRC } from '@utils/wearable/shared/shredUtils.ts'; // Import buffer to convert the data

const enableRealTimeMonitoring = () => {
  const data = [
    0x09, // Command for real-time step counting and temperature mode
    0x01, // Enable step counting
    0x01, // Enable temperature monitoring
    0x01,
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
    0x00, // Filler bytes
  ];

  data[15] = calculateCRC(data.slice(0, 15)); // Append CRC as the last byte

  return data;
};

export const enableRealtimeMode = async (
  deviceId: string,
  serviceUUID: string,
  characteristicUUID: string,
) => {
  try {
    const data = enableRealTimeMonitoring(); // Generate the command data
    await BleManager.write(
      deviceId,
      serviceUUID,
      characteristicUUID,
      data, // BLE requires base64 encoding
    );
    console.log('Real-time monitoring enabled successfully!');
  } catch (error) {
    console.error('Error sending command:', error);
  }
};

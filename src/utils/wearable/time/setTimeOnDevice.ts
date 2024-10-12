import BleManager from 'react-native-ble-manager';
import { calculateCRC, toBCD } from '@utils/wearable/shared/shredUtils.ts';

export const setTimeOnDevice = async (
  deviceId: string,
  serviceUUID: string,
  characteristicUUID: string,
) => {
  try {
    const now = new Date();
    const year = now.getFullYear() % 100;
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const timeCommand = [
      0x01,
      toBCD(year),
      toBCD(month),
      toBCD(day),
      toBCD(hour),
      toBCD(minute),
      toBCD(second),
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
    timeCommand[15] = calculateCRC(timeCommand.slice(0, 15));
    await BleManager.write(
      deviceId,
      serviceUUID,
      characteristicUUID,
      timeCommand,
    );
    console.log('Time set on device successfully');
  } catch (error) {
    console.error('Failed to set time on device:', error);
  }
};

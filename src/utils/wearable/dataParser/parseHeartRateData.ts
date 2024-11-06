import { core } from '@config/Configuration.ts';
import { deleteData } from '@utils/wearable/deleteData.ts';
import { DataType } from '@utils/wearable/requestData.ts';
import { formatDate } from 'date-fns';

export const parseHeartRateData = (dataView: DataView, deviceId: string) => {
  const heartRateRecords = [];
  let offset = 1; // Skip the start byte

  // Define the expected length for a complete heart rate record
  const MIN_RECORD_LENGTH = 20; // 2 (dataNumber) + 6 (date) + 12 (heart rate values)

  while (offset + MIN_RECORD_LENGTH <= dataView.byteLength) {
    // Check if there is enough data left for a complete record
    if (offset + MIN_RECORD_LENGTH > dataView.byteLength) {
      console.warn(
        `Insufficient data for a complete heart rate record at offset ${offset}`,
      );
      break;
    }
    offset += 2;
    const bcdToDecimal = (bcdValue: number) =>
      (bcdValue >> 4) * 10 + (bcdValue & 0x0f);
    // Read and parse date and time (6 bytes)
    const year = bcdToDecimal(dataView.getUint8(offset++)) + 2000;
    const month = bcdToDecimal(dataView.getUint8(offset++));
    const day = bcdToDecimal(dataView.getUint8(offset++));
    const hour = bcdToDecimal(dataView.getUint8(offset++));
    const minute = bcdToDecimal(dataView.getUint8(offset++));
    const second = bcdToDecimal(dataView.getUint8(offset++));
    const baseTime = new Date(year, month - 1, day, hour, minute, second);

    // Check if there are enough bytes for the 12 heart rate values
    if (offset + 12 > dataView.byteLength) {
      console.warn(
        `Insufficient data for heart rate values at offset ${offset}`,
      );
      break;
    }

    // Read heart rate values (12 bytes, each representing a heart rate measurement every 10 seconds)
    const heartRateValues = [];
    for (let i = 0; i < 12; i++) {
      heartRateValues.push(dataView.getUint8(offset++));
    }

    // Map heart rate values to corresponding timestamps
    const heartRateMeasurements = heartRateValues.map((hrValue, index) => {
      const dateTime = new Date(baseTime.getTime() + index * 10 * 1000);
      return {
        date: formatDate(dateTime, 'yyyy-MM-dd HH:mm:ss'),
        hr: hrValue,
      };
    });

    // Store the parsed heart rate record
    heartRateRecords.push(heartRateMeasurements[0]);
  }
  // Store the parsed heart rate data
  core.storeDeviceHealthData
    .execute({ hr: heartRateRecords })
    .then((result) => {
      if (result.type === 'success') {
        deleteData(deviceId, DataType.HR);
      }
    })
    .catch((error) => {
      console.error('Error storing heart rate data:', error);
    });
};

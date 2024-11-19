import { core } from '@config/Configuration.ts';
import { deleteData } from '@utils/wearable/deleteData.ts';
import { DataType } from '@utils/wearable/requestData.ts';
import { format as formatDate } from 'date-fns';

export const parseHeartRateData = (dataView: DataView, deviceId: string) => {
  const heartRateRecords = [];
  let offset = 1; // Skip the start byte

  // Define the expected length for a complete heart rate record
  const MIN_RECORD_LENGTH = 20; // 2 (dataNumber) + 6 (date) + 12 (heart rate values)

  let ok = 0;
  let notOk = 0;

  // Helper function to decode BCD to decimal with bounds checking
  const bcdToDecimal = (bcdValue: number) =>
    (bcdValue >> 4) * 10 + (bcdValue & 0x0f);

  while (offset + MIN_RECORD_LENGTH <= dataView.byteLength) {
    // Skip the dataNumber part
    offset += 2;

    // Parse and validate each component of the date
    const year = bcdToDecimal(dataView.getUint8(offset++)) + 2000;
    const month = bcdToDecimal(dataView.getUint8(offset++));
    const day = bcdToDecimal(dataView.getUint8(offset++));
    const hour = bcdToDecimal(dataView.getUint8(offset++));
    const minute = bcdToDecimal(dataView.getUint8(offset++));
    const second = bcdToDecimal(dataView.getUint8(offset++));

    // Check if the date components fall within valid ranges
    const isValidDate =
      year >= 2000 &&
      year <= new Date().getFullYear() &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31 &&
      hour >= 0 &&
      hour <= 23 &&
      minute >= 0 &&
      minute <= 59 &&
      second >= 0 &&
      second <= 59;

    if (!isValidDate) {
      console.warn(
        `Invalid date parsed: ${year}-${month}-${day} ${hour}:${minute}:${second}`,
      );
      notOk++;
      continue; // Skip this record if date is invalid
    }

    const baseTime = new Date(year, month - 1, day, hour, minute, second);

    // Read heart rate values (12 bytes)
    const heartRateValues = [];
    for (let i = 0; i < 12; i++) {
      heartRateValues.push(dataView.getUint8(offset++));
    }

    // Map heart rate values to corresponding timestamps
    const heartRateMeasurements = heartRateValues.map((hrValue, index) => ({
      date: formatDate(
        new Date(baseTime.getTime() + index * 10 * 1000),
        'yyyy-MM-dd HH:mm:ss',
      ),
      hr: hrValue,
    }));

    heartRateRecords.push(...heartRateMeasurements);
    ok++;
  }

  console.log(`Valid Records: ${ok}, Invalid Records: ${notOk}`);
  console.log(JSON.stringify(heartRateRecords));

  if (heartRateRecords.length > 0) {
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
  } else {
    console.warn('No valid heart rate records to store.');
  }
};

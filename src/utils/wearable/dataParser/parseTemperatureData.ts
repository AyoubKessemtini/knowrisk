import { formatDate } from 'date-fns';
import { core } from '@config/Configuration.ts';
import { deleteData } from '@utils/wearable/deleteData.ts';
import { DataType } from '@utils/wearable/requestData.ts';

export const parseTemperatureData = (dataView: DataView, deviceId: string) => {
  const MIN_RECORD_LENGTH = 15; // Each temperature record is 15 bytes long

  // Assuming `dataView` is a DataView object containing the received data
  const temperatureRecords = [];

  // Calculate the number of records
  const totalRecords = Math.floor(dataView.byteLength / MIN_RECORD_LENGTH);

  // Iterate over each record
  for (let recordIndex = 0; recordIndex < totalRecords; recordIndex++) {
    const recordOffset = recordIndex * MIN_RECORD_LENGTH;

    const remainingBytes = dataView.byteLength - recordOffset;
    if (remainingBytes < MIN_RECORD_LENGTH) {
      console.warn(
        `Not enough data to read a complete temperature record at recordIndex ${recordIndex}. Remaining bytes: ${remainingBytes}`,
      );
      break;
    }

    // Ensure the start byte is correct for temperature data (0x62)
    const startByte = dataView.getUint8(recordOffset);
    if (startByte !== 0x62) {
      console.warn(
        `Invalid start byte for temperature data at recordIndex ${recordIndex}: ${startByte}`,
      );
      continue; // Skip this record
    }

    let offset = recordOffset + 1; // Move past the start byte

    // Read ID1 and ID2 (2 bytes, little-endian)
    const dataNumber = dataView.getUint16(offset, true); // Little-endian
    offset += 2;

    const bcdToDecimal = (bcdValue: number) =>
      (bcdValue >> 4) * 10 + (bcdValue & 0x0f);

    // Parse and decode the date and time in BCD format
    const year = bcdToDecimal(dataView.getUint8(offset++)) + 2000;
    const month = bcdToDecimal(dataView.getUint8(offset++));
    const day = bcdToDecimal(dataView.getUint8(offset++));
    const hour = bcdToDecimal(dataView.getUint8(offset++));
    const minute = bcdToDecimal(dataView.getUint8(offset++));
    const second = bcdToDecimal(dataView.getUint8(offset++));
    const dateTime = new Date(year, month - 1, day, hour, minute, second);

    // Read temperature value (T1 and T2 are 2 bytes, high digit comes after)
    const T1 = dataView.getUint8(offset); // Lower byte
    offset += 1;

    const T2 = dataView.getUint8(offset); // Higher byte
    offset += 1;

    // Combine T1 and T2 to get the temperature value
    const temperature = ((T2 << 8) | T1) / 10; // Shift the high byte and combine, then divide by 10 for 1 decimal place

    // Store the parsed temperature record
    temperatureRecords.push({
      dataNumber,
      dateTime: formatDate(dateTime, 'yyyy-MM-dd HH:mm:ss'),
      temperature,
    });
  }

  core.storeDeviceHealthData
    .execute({ temperature: temperatureRecords })
    .then((result) => {
      if (result.type === 'success') {
        deleteData(deviceId, DataType.TEMP);
      }
    });

  // Log the parsed temperature records
  console.info('Temperature:', temperatureRecords);
};

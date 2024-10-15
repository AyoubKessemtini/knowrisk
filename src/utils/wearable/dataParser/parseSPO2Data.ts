import { format as formatDate } from 'date-fns/format';
import { core } from '@config/Configuration.ts';
import { deleteData } from '@utils/wearable/deleteData.ts';
import { DataType } from '@utils/wearable/requestData.ts';

export const parseSPO2Data = (dataView: DataView, deviceId: string) => {
  const MIN_RECORD_LENGTH = 10; // Each SpO2 record is 10 bytes long

  // Assuming `dataView` is a DataView object containing the received data
  const spo2Records = [];

  // Calculate the number of records (each is 10 bytes)
  const totalRecords = Math.floor(dataView.byteLength / MIN_RECORD_LENGTH);

  // Iterate over each record
  for (let recordIndex = 0; recordIndex < totalRecords; recordIndex++) {
    const recordOffset = recordIndex * MIN_RECORD_LENGTH;

    const remainingBytes = dataView.byteLength - recordOffset;
    if (remainingBytes < MIN_RECORD_LENGTH) {
      console.warn(
        `Not enough data to read a complete SpO2 record at recordIndex ${recordIndex}. Remaining bytes: ${remainingBytes}`,
      );
      break;
    }

    // Ensure the start byte is correct for SpO2 (0x66)
    const startByte = dataView.getUint8(recordOffset);
    if (startByte !== 0x66) {
      console.warn(
        `Invalid start byte for SpO2 data at recordIndex ${recordIndex}: ${startByte}`,
      );
      continue; // Skip this record
    }

    let offset = recordOffset + 1; // Move past the start byte

    // Read ID1 and ID2 (2 bytes, little-endian)
    const dataNumber = dataView.getUint16(offset, true);
    offset += 2;

    // Read the date and time (6 bytes)
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

    // Read blood oxygen level (1 byte)
    const spo2Level = dataView.getUint8(offset);
    offset += 1;

    // Store the parsed SpO2 record
    spo2Records.push({
      dataNumber,
      dateTime: formatDate(dateTime, 'yyyy-MM-dd HH:mm:ss'),
      spo2Level,
    });
  }

  core.storeDeviceHealthData.execute({ spo2: spo2Records }).then((result) => {
    if (result.type === 'success') {
      deleteData(deviceId, DataType.SPO2);
    }
  });
};

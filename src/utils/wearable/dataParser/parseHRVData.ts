import { format as formatDate } from 'date-fns';
import { core } from '@config/Configuration.ts';
import { deleteData } from '@utils/wearable/deleteData.ts';
import { DataType } from '@utils/wearable/requestData.ts';

export const parseHRVData = (dataView: DataView, deviceId: string) => {
  const MIN_RECORD_LENGTH = 15;
  const hrvRecords = [];

  const totalRecords = Math.floor(dataView.byteLength / MIN_RECORD_LENGTH);
  for (let recordIndex = 0; recordIndex < totalRecords; recordIndex++) {
    const recordOffset = recordIndex * MIN_RECORD_LENGTH;
    let offset = recordOffset + 1; // Skip the start byte

    const dataNumber = dataView.getUint16(offset, true); // ID1 ID2
    offset += 2;

    // BCD to decimal conversion function
    const bcdToDecimal = (bcdValue: number) =>
      (bcdValue >> 4) * 10 + (bcdValue & 0x0f);

    // Decode date and time fields in BCD format
    const year = bcdToDecimal(dataView.getUint8(offset)) + 2000;
    offset += 1;
    const month = bcdToDecimal(dataView.getUint8(offset++));
    const day = bcdToDecimal(dataView.getUint8(offset++));
    const hour = bcdToDecimal(dataView.getUint8(offset++));
    const minute = bcdToDecimal(dataView.getUint8(offset++));
    const second = bcdToDecimal(dataView.getUint8(offset++));

    // Create a date object
    const dateTime = new Date(year, month - 1, day, hour, minute, second);

    // Format date using date-fns
    const formattedDate = formatDate(dateTime, 'yyyy-MM-dd HH:mm:ss');

    // Get HRV value
    const hrvValue = dataView.getUint8(offset++);
    offset += 2; // Skip D2 and D3 (reserved fields)

    // Get fatigue level
    const fatigueLevel = dataView.getUint8(offset);
    offset += 3; // Skip reserved bytes

    hrvRecords.push({
      dataNumber,
      dateTime: formattedDate,
      hrvValue,
      fatigueLevel,
    });
  }

  console.log('Parsed HRV Records:', hrvRecords);

  core.storeDeviceHealthData.execute({ hrv: hrvRecords }).then((result) => {
    if (result.type === 'success') {
      deleteData(deviceId, DataType.HRV);
    }
  });
};

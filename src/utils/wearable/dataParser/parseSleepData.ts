import { format as formatDate } from 'date-fns';
import { core } from '@config/Configuration.ts';
//import { deleteData } from "@utils/wearable/deleteData.ts";
//import { DataType } from "@utils/wearable/requestData.ts";

export const parseSleepData = (dataView: DataView, deviceId: string) => {
  console.log(deviceId);
  let offset = 3; // Skip start byte and ID1, ID2

  // Helper function to decode BCD to decimal
  const bcdToDecimal = (bcdValue: number) =>
    (bcdValue >> 4) * 10 + (bcdValue & 0x0f);

  // Parse and decode the date and time in BCD format
  const year = bcdToDecimal(dataView.getUint8(offset++)) + 2000;
  const month = bcdToDecimal(dataView.getUint8(offset++));
  const day = bcdToDecimal(dataView.getUint8(offset++));
  const hour = bcdToDecimal(dataView.getUint8(offset++));
  const minute = bcdToDecimal(dataView.getUint8(offset++));
  const second = bcdToDecimal(dataView.getUint8(offset++));
  const startSleepDate = new Date(year, month - 1, day, hour, minute, second);

  const len = dataView.getUint8(offset++);
  const sleepData = [];

  for (let i = 0; i < len; i++) {
    sleepData.push(dataView.getUint8(offset++));
  }

  // Calculate total sleep time (each interval is 5 minutes)
  const totalSleepTime = sleepData.length * 5; // in minutes

  // Create sleep intervals with start and end times
  const sleepIntervals = sleepData.map((sd, index) => {
    const intervalStart = new Date(
      startSleepDate.getTime() + index * 5 * 60 * 1000,
    );
    const intervalEnd = new Date(intervalStart.getTime() + 5 * 60 * 1000);
    return {
      start: formatDate(intervalStart, 'yyyy-MM-dd HH:mm:ss'),
      end: formatDate(intervalEnd, 'yyyy-MM-dd HH:mm:ss'),
      qualityCode: sd,
      quality: mapSleepQuality(sd),
    };
  });

  // Prepare the data to store in the desired format
  const parsedSleepData = {
    startSleepDate: formatDate(startSleepDate, 'yyyy-MM-dd HH:mm:ss'),
    totalSleepTime, // in minutes
    sleepData: sleepIntervals,
  };

  console.log('Parsed Sleep Data:', parsedSleepData);

  core.storeDeviceHealthData
    .execute({ sleep: parsedSleepData })
    .then((result) => {
      if (result.type === 'success') {
        // deleteData(deviceId, DataType.SLEEP);
      }
    });
};

// Helper function to map sleep quality
const mapSleepQuality = (qualityCode: number) => {
  const sleepQualityMap: { [key: number]: string } = {
    0: 'Awake',
    1: 'Light Sleep',
    2: 'Deep Sleep',
    3: 'Unknown',
    30: 'Unknown',
  };
  return sleepQualityMap[qualityCode] || 'Unknown';
};

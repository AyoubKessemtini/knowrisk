import { format as formatDate } from 'date-fns';
import { core } from '@config/Configuration.ts';
import { deleteData } from '@utils/wearable/deleteData.ts';
import { DataType } from '@utils/wearable/requestData.ts';

export const parseSleepData = (dataView: DataView, deviceId: string) => {
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

  // Read the length of the sleep data (how many minutes of data)
  const len = dataView.getUint8(offset++);
  const sleepData = [];

  // Loop through each sleep quality data (1 minute per value)
  for (let i = 0; i < len; i++) {
    sleepData.push(dataView.getUint8(offset++));
  }

  // Calculate total sleep time based on length (each value is 1 minute)
  const totalSleepTime = sleepData.length; // in minutes

  // Create sleep intervals with start and end times (each interval is 1 minute)
  const sleepIntervals = sleepData.map((sd, index) => {
    const intervalStart = new Date(
      startSleepDate.getTime() + index * 60 * 1000, // Each interval is 1 minute
    );
    const intervalEnd = new Date(intervalStart.getTime() + 60 * 1000); // 1-minute interval
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
  console.info('sleep', parsedSleepData);
  // Store the parsed sleep data
  core.storeDeviceHealthData
    .execute({ sleep: parsedSleepData })
    .then((result) => {
      if (result.type === 'success') {
        deleteData(deviceId, DataType.SLEEP); // Optionally delete data if needed
      }
    })
    .catch((error) => {
      console.error('Error storing sleep data:', error);
    });
};

// Helper function to map sleep quality
const mapSleepQuality = (qualityCode: number) => {
  const sleepQualityMap: { [key: number]: string } = {
    1: 'Awake',
    2: 'REM',
    3: 'Light Sleep',
    4: 'Deep Sleep',
    5: 'Nap',
  };
  return sleepQualityMap[qualityCode] || 'Unknown';
};

interface SleepInterval {
  start: Date | string;
  end: Date | string;
  quality: string;
  qualityCode: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DeviceSleepData {
  date: Date | string;
  sleepIntervals: SleepInterval[];
  sleepDataLength: number;
}

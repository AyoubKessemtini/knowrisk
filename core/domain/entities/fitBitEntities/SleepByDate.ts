interface SleepLevelData {
  dateTime: string;
  level: string;
  seconds: number;
}

interface SleepLevelSummary {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

interface SleepLevels {
  data: SleepLevelData[];
  shortData: SleepLevelData[];
  summary: {
    deep: SleepLevelSummary;
    light: SleepLevelSummary;
    rem: SleepLevelSummary;
    wake: SleepLevelSummary;
  };
}

interface SleepEntry {
  dateOfSleep: string;
  duration: number;
  efficiency: number;
  endTime: string;
  infoCode: number;
  isMainSleep: boolean;
  levels: SleepLevels;
  logId: number;
  logType: string;
  minutesAfterWakeup: number;
  minutesAsleep: number;
  minutesAwake: number;
  minutesToFallAsleep: number;
  startTime: string;
  timeInBed: number;
  type: string;
}

interface SleepSummaryStages {
  deep: number;
  light: number;
  rem: number;
  wake: number;
}

interface SleepSummary {
  stages: SleepSummaryStages;
  totalMinutesAsleep: number;
  totalSleepRecords: number;
  totalTimeInBed: number;
}

export interface SleepData {
  sleep: SleepEntry[];
  summary: SleepSummary;
}

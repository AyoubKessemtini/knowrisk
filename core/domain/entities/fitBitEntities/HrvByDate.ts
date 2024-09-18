interface HRVValue {
  rmssd: number;
  coverage: number;
  hf: number;
  lf: number;
}

interface HRVMinute {
  minute: string; // ISO timestamp string
  value: HRVValue;
}

interface HRVDay {
  dateTime: string; // Date in ISO format
  minutes: HRVMinute[];
}

export interface HRVData {
  hrv: HRVDay[];
}

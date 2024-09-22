interface SpO2Value {
  avg: number;
  min: number;
  max: number;
}

export interface SpO2Data {
  dateTime: string;
  value: SpO2Value;
}

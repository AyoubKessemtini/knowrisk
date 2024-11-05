export interface stressRateData {
  stressLevel: string;
  time: string;
  percentage: string;
}
export interface StressDeviceData {
  data: stressRateData[];
  stressAVG: number;
}

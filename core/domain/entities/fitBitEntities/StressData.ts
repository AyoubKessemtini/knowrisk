interface ECGReading {
  startTime: string;
  averageHeartRate: number;
  resultClassification: string;
  waveformSamples: number[];
  samplingFrequencyHz: string;
  scalingFactor: number;
  numberOfWaveformSamples: number;
  leadNumber: number;
  featureVersion: string;
  deviceName: string;
  firmwareVersion: string;
}

interface Pagination {
  afterDate: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  sort: string;
}

export interface StressData {
  ecgReadings: ECGReading[];
  pagination: Pagination;
}

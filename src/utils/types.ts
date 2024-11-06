// types.ts
export interface SeizureEvent {
  date: string;
  time_from: string;
  time_to: string;
  type: string;
}

export interface SeizureForecastState {
  events: SeizureEvent[];
  loading: boolean;
  error: string | null;
}

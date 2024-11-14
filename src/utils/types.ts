// types.ts
export interface SeizureEvent {
  date: string;
  time_from: string;
  time_to: string;
  type: string;
  alcohol: boolean;
  exercise: boolean;
  eat: string;
  id: string;
}

export interface SeizureForecastState {
  events: SeizureEvent[];
  loading: boolean;
  error: string | null;
  successMessage: string | null; // Add this line to define successMessage

}

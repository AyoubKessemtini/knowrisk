import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeizureEvent, SeizureForecastState } from '@utils/types';

const initialState: SeizureForecastState = {
  events: [],
  loading: false,
  error: null,
};

export const seizureSlice = createSlice({
  name: 'seizureForecast',
  initialState,
  reducers: {
    // fetchSeizureForecast actions
    fetchSeizureForecastRequest: (
      state,
      action: PayloadAction<{ id: string; month: string }>,
    ) => {
      state.loading = true;
      state.error = null;
    },

    fetchSeizureForecastSuccess: (
      state,
      action: PayloadAction<SeizureEvent[]>,
    ) => {
      state.loading = false;
      state.events = action.payload;
    },
    fetchSeizureForecastFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const seizureActions = seizureSlice.actions;

// Export the reducer
export default seizureSlice.reducer;

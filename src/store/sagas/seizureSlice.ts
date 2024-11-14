import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeizureEvent, SeizureForecastState } from '@utils/types';

const initialState: SeizureForecastState = {
  events: [],
  loading: false,
  error: null,
  successMessage: null, // Initialize successMessage
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
      state.successMessage = null;
      state.events = []; // Reset events
    },

    fetchSeizureForecastSuccess: (
      state,
      action: PayloadAction<{ successMessage: string; events: SeizureEvent[] }>,
    ) => {
      state.loading = false;
      state.successMessage = action.payload.successMessage;
      state.events = action.payload.events;
    },

    fetchSeizureForecastFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.events = []; // Reset events

    },
    resetSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
});

// Export actions
export const seizureActions = seizureSlice.actions;

// Export the reducer
export default seizureSlice.reducer;

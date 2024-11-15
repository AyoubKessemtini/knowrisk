// forgetPasswordOTPSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface forgetPasswordOTPState {
  otp?: string;
  password?: string;
  loading: boolean;
  error?: string | null; // For error handling
  successMessage?: string | null; // For success messages
}

const initialState: forgetPasswordOTPState = {
  loading: false, 
  error: null,
  successMessage: null, // Initialisation de `successMessage`
};

export const forgetPasswordOTPSlice = createSlice({
  name: 'forgetPasswordOTP',
  initialState,
  reducers: {
    forgetPasswordOTPRequest(
      state,
      action: PayloadAction<{ otp: string; password: string }>,
    ) {
      state.loading = true;
      state.error = null;
      state.successMessage = null; // Reset success message
      // Store `otp` and `password` in the state
      state.otp = action.payload.otp;
      state.password = action.payload.password;
    },
    forgetPasswordOTPSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload; // ou toute logique nécessaire
    },
    forgetPasswordOTPFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Enregistrer le message d'erreur
    },
    forgetPasswordOTPReset: (state) => {
      state.loading = false;
      state.error = null; // Reset error to null
      state.successMessage = null; // Reset success message
      state.otp = undefined; // Clear `otp`
      state.password = undefined; // Clear `password`
    },
  },
});

export const {
  forgetPasswordOTPRequest,
  forgetPasswordOTPSuccess,
  forgetPasswordOTPFailure,
} = forgetPasswordOTPSlice.actions;
// Export actions
export const forgetPasswordOTPActions = forgetPasswordOTPSlice.actions;

export default forgetPasswordOTPSlice.reducer;

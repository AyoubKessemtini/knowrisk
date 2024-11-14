// changePasswordSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface changePasswordState {
  oldPassword?: string;
  password?: string;
  loading: boolean;
  error?: string | null; // For error handling
  successMessage?: string | null; // For success messages
}

const initialState: changePasswordState = {
  loading: false,
  error: null,
  successMessage: null, // Initialisation de `successMessage`
};

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    changePasswordRequest(
      state,
      action: PayloadAction<{ oldPassword: string; password: string }>,
    ) {
      state.loading = true;
      state.error = null;
      state.successMessage = null; // Reset success message
      // Store `otp` and `password` in the state
      state.oldPassword = action.payload.oldPassword;
      state.password = action.payload.password;
    },
    changePasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload; // ou toute logique nécessaire
    },
    changePasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Enregistrer le message d'erreur
    },
    changePasswordReset: (state) => {
      state.loading = false;
      state.error = null; // Reset error to null
      state.successMessage = null; // Reset success message
      state.oldPassword = undefined; // Clear `otp`
      state.password = undefined; // Clear `password`
    },
  },
});

export const {
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} = changePasswordSlice.actions;
// Export actions
export const changePasswordActions = changePasswordSlice.actions;

export default changePasswordSlice.reducer;

// forgetPasswordSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface forgetPasswordState {
  email?: string;
  loading: boolean;
  error?: string | null; // Ajout de la propriété `error` pour gérer les erreurs,
  successMessage?: string | null; // Ajout de la propriété `successMessage`
}

const initialState: forgetPasswordState = {
  loading: false,
  error: null,
  successMessage: null, // Initialisation de `successMessage`
};

export const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState,
  reducers: {
    forgetPasswordRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
      state.successMessage = null; // Réinitialiser le message de succès
      // Réinitialiser l'erreur lors d'une nouvelle soumission
      state.email = action.payload; // Enregistrer l'email dans l'état
    },
    forgetPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload; // ou toute logique nécessaire
    },
    forgetPasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Enregistrer le message d'erreur
    },
    forgetPasswordReset: (state) => {
      state.error = null; // Reset the error to null
    },
  },
});

export const {
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
} = forgetPasswordSlice.actions;
// Export actions
export const forgetPasswordActions = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;

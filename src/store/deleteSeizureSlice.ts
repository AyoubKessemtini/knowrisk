// deleteSeizureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface deleteSeizureState {
  id?: string;
  loading: boolean;
  error?: string | null; // For error handling
  successMessage?: string | null; // For success messages
}

const initialState: deleteSeizureState = {
  loading: false,
  error: null,
  successMessage: null, // Initialisation de `successMessage`
};

export const deleteSeizureSlice = createSlice({
  name: 'deleteSeizure',
  initialState,
  reducers: {
    deleteSeizureRequest(state, action: PayloadAction<{ id: string }>) {
      state.loading = true;
      state.error = null;
      state.successMessage = null; // Reset success message
      // Store `otp` and `password` in the state
      state.id = action.payload.id;
    },
    deleteSeizureSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload; // ou toute logique nécessaire
    },
    deleteSeizureFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Enregistrer le message d'erreur
    },
    deleteSeizureReset: (state) => {
      state.loading = false;
      state.error = null; // Reset error to null
      state.successMessage = null; // Reset success message
      state.id = undefined; // Clear `otp`
    },
  },
});

export const {
  deleteSeizureRequest,
  deleteSeizureSuccess,
  deleteSeizureFailure,
} = deleteSeizureSlice.actions;
// Export actions
export const deleteSeizureActions = deleteSeizureSlice.actions;

export default deleteSeizureSlice.reducer;

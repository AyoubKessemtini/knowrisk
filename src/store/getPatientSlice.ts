// getPatientFormSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string; 
  birthday: string;
  blood_type: string;
  height: number;
  weight: number;
  // Add other fields as needed
}
interface getPatientFormState {
  data: Patient | null;
  loading: boolean;
  error: string | null;
}

const initialState: getPatientFormState = {
  data: null,
  loading: false,
  error: null,
};
interface GetPatientReportRequestPayload {
  id: string;
}

export const getPatientFormSlice = createSlice({
  name: 'getPatientForm',
  initialState,
  reducers: {
    submitgetPatientReportRequest(
      state,
      action: PayloadAction<GetPatientReportRequestPayload>,
    ) {
      state.loading = true;
      state.error = null;
      // Réinitialiser l'erreur lors d'une nouvelle soumission
    },
    submitgetPatientReportSuccess(state, action: PayloadAction<Patient>) {
      state.loading = false;
      state.data = action.payload;
    },
    submitgetPatientReportFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Enregistrer le message d'erreur
    },
  },
});

export const {
  submitgetPatientReportRequest,
  submitgetPatientReportSuccess,
  submitgetPatientReportFailure,
} = getPatientFormSlice.actions;
// Export actions
export const getPatientFormActions = getPatientFormSlice.actions;

export default getPatientFormSlice.reducer;

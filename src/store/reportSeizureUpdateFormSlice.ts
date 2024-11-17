// reportSeizureUpdateFormSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface reportSeizureUpdateFormState {
  id?: string; // Added `id` for the request
  date?: string;
  timeFrom?: string;
  timeTo?: string;
  alcohol?: boolean;
  exercise?: boolean;
  eat?: string;
  loading: boolean;
  error?: string | null; // Ajout de la propriété `error` pour gérer les erreurs,
  successMessage?: string | null; // Ajout de la propriété `successMessage`
}

const initialState: reportSeizureUpdateFormState = {
  loading: false,
  error: null,
  successMessage: null, // Initialisation de `successMessage`
};

export const reportSeizureUpdateFormSlice = createSlice({
  name: 'reportSeizureUpdateForm',
  initialState,
  reducers: {
    setDateUpdated(state, action: PayloadAction<string>) {
      // console.log("Mise à jour de 'date' :", action.payload); // Debugging log

      state.date = action.payload;
    },
    setTimeFromUpdated(state, action: PayloadAction<string>) {
      console.log("Mise à jour de 'timeFrom' :", action.payload); // Debugging log

      state.timeFrom = action.payload;
    },
    setTimeToUpdated(state, action: PayloadAction<string>) {
      console.log("Mise à jour de 'TimeTo' :", action.payload);

      state.timeTo = action.payload;
    },
    setAlcoholUpdated(state, action: PayloadAction<boolean>) {
      // console.log("Mise à jour de 'alcohol' dans le reducer :", action.payload);

      state.alcohol = action.payload;
    },
    setExerciseUpdated(state, action: PayloadAction<boolean>) {
      // console.log(
      //   "Mise à jour de 'exercise' dans le reducer :",
      //   action.payload,
      // );

      state.exercise = action.payload;
    },
    setEatUpdated(state, action: PayloadAction<string>) {
      // console.log("Mise à jour de 'eat' dans le reducer :", action.payload);
      state.eat = action.payload;
    },
    submitSeizureUpdateReportRequest(
      state,
      action: PayloadAction<{ id: string }>,
    ) {
      state.loading = true;
      state.error = null;
      state.successMessage = null; // Réinitialiser le message de succès
      state.id = action.payload.id; // Set the `id` in state

      // Réinitialiser l'erreur lors d'une nouvelle soumission
    },
    submitSeizureUpdateReportSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload; // ou toute logique nécessaire
    },
    submitSeizureUpdateReportFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Enregistrer le message d'erreur
    },
  },
});

export const {
  setDateUpdated,
  setTimeFromUpdated,
  setTimeToUpdated,
  setAlcoholUpdated,
  setExerciseUpdated,
  setEatUpdated,
  submitSeizureUpdateReportRequest,
  submitSeizureUpdateReportSuccess,
  submitSeizureUpdateReportFailure,
} = reportSeizureUpdateFormSlice.actions;
// Export actions
export const reportSeizureUpdateFormActions =
  reportSeizureUpdateFormSlice.actions;

export default reportSeizureUpdateFormSlice.reducer;

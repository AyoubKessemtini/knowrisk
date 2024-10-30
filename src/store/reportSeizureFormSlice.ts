// reportSeizureFormSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReportSeizureFormState {
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

const initialState: ReportSeizureFormState = {
  loading: false,
  error: null,
  successMessage: null, // Initialisation de `successMessage`

};

export const reportSeizureFormSlice = createSlice({
  name: 'reportSeizureForm',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      // console.log("Mise à jour de 'date' :", action.payload); // Debugging log

      state.date = action.payload;
    },
    setTimeFrom(state, action: PayloadAction<string>) {
       console.log("Mise à jour de 'timeFrom' :", action.payload); // Debugging log

      state.timeFrom = action.payload;
    },
    setTimeTo(state, action: PayloadAction<string>) {
      // console.log("Mise à jour de 'TimeTo' dans le reducer :", action.payload);

      state.timeTo = action.payload;
    },
    setAlcohol(state, action: PayloadAction<boolean>) {
      // console.log("Mise à jour de 'alcohol' dans le reducer :", action.payload);

      state.alcohol = action.payload;
    },
    setExercise(state, action: PayloadAction<boolean>) {
      // console.log(
      //   "Mise à jour de 'exercise' dans le reducer :",
      //   action.payload,
      // );

      state.exercise = action.payload;
    },
    setEat(state, action: PayloadAction<string>) {
      // console.log("Mise à jour de 'eat' dans le reducer :", action.payload);
      state.eat = action.payload;
    },
    submitSeizureReportRequest(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null; // Réinitialiser le message de succès
      // Réinitialiser l'erreur lors d'une nouvelle soumission
    },
    submitSeizureReportSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload; // ou toute logique nécessaire
    },
    submitSeizureReportFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Enregistrer le message d'erreur
    },
  },
});

export const {
  setDate,
  setTimeFrom,
  setTimeTo,
  setAlcohol,
  setExercise,
  setEat,
  submitSeizureReportRequest,
  submitSeizureReportSuccess,
  submitSeizureReportFailure,
} = reportSeizureFormSlice.actions;
// Export actions
export const reportSeizureFormActions = reportSeizureFormSlice.actions;

export default reportSeizureFormSlice.reducer;

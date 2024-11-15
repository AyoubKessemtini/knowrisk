import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UpdateProfileState {
  first_name?: string;
  last_name?: string;
  email?: string;
  birthday?: string; 
  height?: number;
  weight?: number;
  blood_type?: string;
  phone?: string;
  gender?: string;
  loading?: boolean;
  error?: string | null;
  successMessage?: string | null;
}

const initialState: UpdateProfileState = {
  loading: false,
  error: null,
  successMessage: null,
};

export const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    updateProfileRequest(
      state,
      action: PayloadAction<Partial<UpdateProfileState>>,
    ) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;

      // Update the state with any fields provided in the action payload
      Object.assign(state, action.payload);
    },
    updateProfileSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.successMessage = action.payload;
      state.error = null; // Clear any previous error
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null; // Clear any previous success message
    },
    updateProfileReset(state) {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      // Clear other fields if necessary, or keep them as-is
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  updateProfileReset,
} = updateProfileSlice.actions;

export const updateProfileActions = updateProfileSlice.actions;

export default updateProfileSlice.reducer;

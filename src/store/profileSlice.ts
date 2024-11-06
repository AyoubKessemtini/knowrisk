import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';

// Define the shape of Profile data including the new answer and device type
interface ProfileData {
  birthday: string;
  height: number;
  weight: number;
  blood_type: string;
  gender: string;
  device_type?: string; // Optional if not set yet
  answer?: string; // Optional if not set yet
  affected_since_when?: string; // Data from Question1
  seizures_per_day?: string;
  triggers?: string;
}

interface ProfileState {
  loading: boolean;
  errorProfile: string | null;
  successMessage: string | null;
  profileData: Partial<ProfileData>; // Add profileData as Partial to allow incomplete data
}

const initialState: ProfileState = {
  loading: false,
  errorProfile: null,
  successMessage: null,
  profileData: {}, // Initialize profileData as an empty object
};

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileRequest: (state, action: PayloadAction<ProfileData>) => {
      state.loading = true;
      state.errorProfile = null;
      state.successMessage = null;
    },
    setProfileSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.successMessage = action.payload;
      state.errorProfile = null;
      PersistenceStorage.setItem(KEYS.IS_PROFILE_SET, 'true');
    },
    setProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorProfile = action.payload;
      state.successMessage = null;
    },
    resetProfileErrors: (state) => {
      state.errorProfile = null;
      state.successMessage = null;
    },
    updateProfileData: (state, action: PayloadAction<Partial<ProfileData>>) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },
    resetProfileState: () => initialState, //
  },
});

// Export actions and reducer
export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice.reducer;

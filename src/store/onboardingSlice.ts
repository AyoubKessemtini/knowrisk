// import { SignUpCommand } from '@core/usecases/authRepo/SignUp';
// import { CreateProfileCommand } from '@core/usecases/userRepo/CreateProfile';
// import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// interface OnboardingState {
//   singupInfo: SignUpCommand;
//   profileInfo: CreateProfileCommand;
// }

// const initialState: OnboardingState = {
//   singupInfo: {
//     email: '',
//     password: '',
//   },
//   profileInfo: {
//     firstname: '',
//     lastname: '',
//     username: '',
//     gender: 'unknown',
//   },
// };

// export const onboardingSlice = createSlice({
//   name: 'onboarding',
//   initialState,
//   reducers: {
//     setSignupInfo: (
//       state,
//       { payload }: PayloadAction<Partial<SignUpCommand>>,
//     ) => {
//       state.singupInfo = { ...state.singupInfo, ...payload };
//     },
//     setProfileInfo: (
//       state,
//       { payload }: PayloadAction<Partial<CreateProfileCommand>>,
//     ) => {
//       state.profileInfo = { ...state.profileInfo, ...payload };
//     },
//   },
// });

// export const OnboardingActions = onboardingSlice.actions;

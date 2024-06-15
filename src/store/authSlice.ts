import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
  },
});

export const AuthActions = authSlice.actions;

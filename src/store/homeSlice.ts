import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface HomeState {
  updateMe: boolean;
  phoneNum: number;
}

const initialState: HomeState = {
  updateMe: false,
  phoneNum: 10,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPhoneNum: (state, { payload }: PayloadAction<number>) => {
      state.phoneNum = payload;
    },
    updateMe: (state, { payload }: PayloadAction<boolean>) => {
      state.updateMe = payload;
    },
  },
});

export const HomeActions = homeSlice.actions;

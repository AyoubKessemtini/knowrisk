import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BleDataSlice {
  isDeviceConnectedBLE: boolean;
}

const initialState: BleDataSlice = {
  isDeviceConnectedBLE: false,
};

export const bleDataSlice = createSlice({
  name: 'bleData',
  initialState,
  reducers: {
    updateDeviceConnection: (state, { payload }: PayloadAction<boolean>) => {
      state.isDeviceConnectedBLE = payload;
    },
  },
});

export const BleDataActions = bleDataSlice.actions;

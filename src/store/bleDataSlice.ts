import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BleDataSlice {
  isDeviceConnectedBLE: boolean;
  deviceId: string;
  deviceName: string;
  hr: string;
  steps: string;
  temperature: string;
  battery: string;
}

const initialState: BleDataSlice = {
  isDeviceConnectedBLE: false,
  deviceId: '--',
  deviceName: 'Knowlepsy device',
  hr: '--',
  steps: '--',
  temperature: '--',
  battery: '--',
};

export const bleDataSlice = createSlice({
  name: 'bleData',
  initialState,
  reducers: {
    updateDeviceConnection: (state, { payload }: PayloadAction<boolean>) => {
      state.isDeviceConnectedBLE = payload;
    },
    updateDeviceId: (state, { payload }: PayloadAction<string>) => {
      state.deviceId = payload;
    },
    updateHr: (state, { payload }: PayloadAction<string>) => {
      state.hr = payload;
    },
    updateTemperature: (state, { payload }: PayloadAction<string>) => {
      state.temperature = payload;
    },
    updateSteps: (state, { payload }: PayloadAction<string>) => {
      state.steps = payload;
    },
    updateDeviceName: (state, { payload }: PayloadAction<string>) => {
      state.deviceName = payload;
    },
    updateBattery: (state, { payload }: PayloadAction<string>) => {
      state.battery = payload;
    },
    //reset all
    reset: (state) => {
      state.isDeviceConnectedBLE = false;
      state.deviceId = '--';
      state.deviceName = 'Knowlepsy device';
      state.hr = '--';
      state.steps = '--';
      state.temperature = '--';
      state.battery = '--';
    },
  },
});

export const BleDataActions = bleDataSlice.actions;


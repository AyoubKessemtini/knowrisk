import BleManager from 'react-native-ble-manager';
import { BleDataActions } from '@store/bleDataSlice.ts';
import { AppDispatch } from '@store/index.ts';

export const disconnectFromDevice = async (
  id: string,
  dispatch: AppDispatch,
) => {
  await BleManager.disconnect(id);
  dispatch(BleDataActions.updateDeviceConnection(false));
  dispatch(BleDataActions.reset());
};

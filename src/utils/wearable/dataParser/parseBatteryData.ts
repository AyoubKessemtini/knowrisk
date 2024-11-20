import {BleDataActions} from "@store/bleDataSlice.ts";
import {AppDispatch} from "@store/index.ts";

export const parseBatteryData = (dataView: DataView, dispatch: AppDispatch) => {
  const MIN_RECORD_LENGTH = 15;
  console.log(dataView);

  let batteryLevel = null;

  if (dataView.byteLength >= MIN_RECORD_LENGTH) {
    const startByte = dataView.getUint8(0);
    if (startByte !== 0x13) {
      console.warn(`Invalid start byte for battery data: ${startByte}`);
    } else {
      batteryLevel = dataView.getUint8(1);
      console.info(`Battery: ${batteryLevel}%`);
      dispatch(BleDataActions.updateBattery(batteryLevel));
    }
  } else {
    console.warn(
      `Data length is insufficient for battery data. Expected 16 bytes, received ${dataView.byteLength}.`,
    );
  }
};

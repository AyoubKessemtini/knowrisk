import { formatDate } from 'date-fns';
import { core } from '@config/Configuration.ts';
import { AppDispatch } from '@store/index.ts';
import { BleDataActions } from '@store/bleDataSlice.ts';

export const parseRealTimeActivities = (
  dataView: DataView,
  dispatch: AppDispatch,
) => {
  let offset = 1; // Skip the start byte
  const totalSteps = dataView.getUint32(offset, true);
  offset += 4;

  const calories = dataView.getUint32(offset, true) / 100;
  offset += 4;

  const walkingDistance = dataView.getUint32(offset, true) / 100;
  offset += 4;

  const movementMinutes = Math.floor(dataView.getUint32(offset, true) / 60);
  offset += 4;

  const fastMotionMinutes = dataView.getUint32(offset, true);
  offset += 4;

  const heartRate = dataView.getUint8(offset++);
  const temperature = dataView.getUint16(offset, true);
  offset += 2;
  const bloodOxygen = dataView.getUint8(offset);

  const activitiesData = {
    totalSteps,
    calories,
    walkingDistance,
    movementMinutes,
    fastMotionMinutes,
    heartRate,
    temperature,
    bloodOxygen,
    date: formatDate(new Date().toISOString(), 'yyyy-MM-dd HH:mm:ss'),
  };

  dispatch(BleDataActions.updateHr(activitiesData.heartRate.toString()));
  dispatch(BleDataActions.updateSteps(activitiesData.totalSteps.toString()));
  dispatch(
    BleDataActions.updateTemperature(activitiesData.temperature.toString()),
  );

  const date = new Date();
  if (date.getSeconds() % 5 === 0) {
    console.log('activities sent');
    core.storeDeviceHealthData.execute({ activitiesData });
  }
};

import { useSendIOSHealthDataMutation } from '@query/queries/iosHealthData/iosHealthDataMutations';
import { useState, useEffect } from 'react';
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from 'react-native-health';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.BodyFatPercentage,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.LeanBodyMass,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.WaistCircumference,
      AppleHealthKit.Constants.Permissions.EnvironmentalAudioExposure,
      AppleHealthKit.Constants.Permissions.HeadphoneAudioExposure,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.RestingHeartRate,
      AppleHealthKit.Constants.Permissions.WalkingHeartRateAverage,
      AppleHealthKit.Constants.Permissions.HeartRateVariability,
      AppleHealthKit.Constants.Permissions.MindfulSession,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.RunningSpeed,
      AppleHealthKit.Constants.Permissions.EnergyConsumed,
      AppleHealthKit.Constants.Permissions.Water,
      AppleHealthKit.Constants.Permissions.RespiratoryRate,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.BloodGlucose,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
      AppleHealthKit.Constants.Permissions.OxygenSaturation,
      // AppleHealthKit.Constants.Permissions.Menstruation,
    ],
    write: [],
  },
};

export type HealthData = {
  [key: string]: HealthValue[];
};

export const useFetchHealthData = (
  date: Date,
): {
  healthData: HealthData;
  loading: boolean;
  error: string | null;
} => {
  const [healthData, setHealthData] = useState<HealthData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { mutate: sendIOSHealthData } = useSendIOSHealthDataMutation();

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (initError: string) => {
      if (initError) {
        setError(initError);
        setLoading(false);
        return;
      }
      const interval = setInterval(fetchData, 1000); // Fetch every second
      return () => clearInterval(interval); // Cleanup on unmount
    });
  }, [date]);
  const fetchData = () => {
    setLoading(true);
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();

    const startDate = isToday ? new Date() : new Date(date);
    startDate.setHours(isToday ? startDate.getHours() - 24 : 0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(isToday ? now.getHours() : 23, 59, 59, 999);

    const startDateISOString = startDate.toISOString();
    const endDateISOString = endDate.toISOString();

    const dataFetchers = [
      {
        key: 'stepCount',
        fetcher: AppleHealthKit.getDailyStepCountSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'distanceWalkingRunning',
        fetcher: AppleHealthKit.getDailyDistanceWalkingRunningSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'activeEnergyBurned',
        fetcher: AppleHealthKit.getActiveEnergyBurned,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'bodyFatPercentage',
        fetcher: AppleHealthKit.getBodyFatPercentageSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'height',
        fetcher: AppleHealthKit.getHeightSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'leanBodyMass',
        fetcher: AppleHealthKit.getLeanBodyMassSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'weight',
        fetcher: AppleHealthKit.getWeightSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'waistCircumference',
        fetcher: AppleHealthKit.getWaistCircumferenceSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'environmentalAudioExposure',
        fetcher: AppleHealthKit.getEnvironmentalAudioExposure,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'headphoneAudioExposure',
        fetcher: AppleHealthKit.getHeadphoneAudioExposure,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'heartRate',
        fetcher: AppleHealthKit.getHeartRateSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'restingHeartRate',
        fetcher: AppleHealthKit.getRestingHeartRateSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'walkingHeartRateAverage',
        fetcher: AppleHealthKit.getWalkingHeartRateAverage,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'heartRateVariability',
        fetcher: AppleHealthKit.getHeartRateVariabilitySamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'mindfulSession',
        fetcher: AppleHealthKit.getMindfulSession,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'stepLength',
        fetcher: AppleHealthKit.getStepCount,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'sixMinuteWalkTestDistance',
        fetcher: AppleHealthKit.getDistanceWalkingRunning,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'walkingSpeed',
        fetcher: AppleHealthKit.getDailyDistanceWalkingRunningSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'dietaryEnergyConsumed',
        fetcher: AppleHealthKit.getEnergyConsumedSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'water',
        fetcher: AppleHealthKit.getWaterSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'respiratoryRate',
        fetcher: AppleHealthKit.getRespiratoryRateSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'sleepAnalysis',
        fetcher: AppleHealthKit.getSleepSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'bloodGlucose',
        fetcher: AppleHealthKit.getBloodGlucoseSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'bloodPressureDiastolic',
        fetcher: AppleHealthKit.getBloodPressureSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'bloodPressureSystolic',
        fetcher: AppleHealthKit.getBloodPressureSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'bodyTemperature',
        fetcher: AppleHealthKit.getBodyTemperatureSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
      {
        key: 'oxygenSaturation',
        fetcher: AppleHealthKit.getOxygenSaturationSamples,
        options: { startDate: startDateISOString, endDate: endDateISOString },
      },
    ];

    const fetchAllData = async () => {
      const results: Partial<HealthData> = {};

      for (const { key, fetcher, options } of dataFetchers) {
        await new Promise<void>((resolve) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fetcher(options, (callbackError: string, data: HealthData | any) => {
            if (callbackError) {
              setError(callbackError);
            } else {
              results[key as keyof HealthData] = data;

              if (data) {
                sendIOSHealthData(
                  { [key]: data },
                  {
                    onSuccess: (response) => {
                      console.log(`${key} data sent successfully:`, response);
                    },
                    onError: (error) => {
                      console.error(`${key} data send error:`, error);
                    },
                  },
                );
              } else {
                console.log(`${key}: No data found, not sending`);
              }
            }
            resolve();
          });
        });
      }

      setHealthData(results as HealthData);
      setLoading(false);
    };

    fetchAllData();
  };

  return { healthData, loading, error };
};

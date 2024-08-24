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

type HealthData = {
  [key: string]: HealthValue[] | undefined;
};

export const useFetchHealthData = (): {
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
      fetchData();
    });
  }, []);

  const fetchData = () => {
    setLoading(true);
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const startDateISOString = startDate.toISOString();

    const dataFetchers = [
      {
        key: 'stepCount',
        fetcher: AppleHealthKit.getDailyStepCountSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'distanceWalkingRunning',
        fetcher: AppleHealthKit.getDailyDistanceWalkingRunningSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'activeEnergyBurned',
        fetcher: AppleHealthKit.getActiveEnergyBurned,
        options: { startDate: startDateISOString },
      },
      {
        key: 'bodyFatPercentage',
        fetcher: AppleHealthKit.getBodyFatPercentageSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'height',
        fetcher: AppleHealthKit.getHeightSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'leanBodyMass',
        fetcher: AppleHealthKit.getLeanBodyMassSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'weight',
        fetcher: AppleHealthKit.getWeightSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'waistCircumference',
        fetcher: AppleHealthKit.getWaistCircumferenceSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'environmentalAudioExposure',
        fetcher: AppleHealthKit.getEnvironmentalAudioExposure,
        options: { startDate: startDateISOString },
      },
      {
        key: 'headphoneAudioExposure',
        fetcher: AppleHealthKit.getHeadphoneAudioExposure,
        options: { startDate: startDateISOString },
      },
      {
        key: 'heartRate',
        fetcher: AppleHealthKit.getHeartRateSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'restingHeartRate',
        fetcher: AppleHealthKit.getRestingHeartRateSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'walkingHeartRateAverage',
        fetcher: AppleHealthKit.getWalkingHeartRateAverage,
        options: { startDate: startDateISOString },
      },
      {
        key: 'heartRateVariability',
        fetcher: AppleHealthKit.getHeartRateVariabilitySamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'mindfulSession',
        fetcher: AppleHealthKit.getMindfulSession,
        options: { startDate: startDateISOString },
      },
      {
        key: 'stepLength',
        fetcher: AppleHealthKit.getStepCount,
        options: { startDate: startDateISOString },
      },
      {
        key: 'sixMinuteWalkTestDistance',
        fetcher: AppleHealthKit.getDistanceWalkingRunning,
        options: { startDate: startDateISOString },
      },
      {
        key: 'walkingSpeed',
        fetcher: AppleHealthKit.getDailyDistanceWalkingRunningSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'dietaryEnergyConsumed',
        fetcher: AppleHealthKit.getEnergyConsumedSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'water',
        fetcher: AppleHealthKit.getWaterSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'respiratoryRate',
        fetcher: AppleHealthKit.getRespiratoryRateSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'sleepAnalysis',
        fetcher: AppleHealthKit.getSleepSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'bloodGlucose',
        fetcher: AppleHealthKit.getBloodGlucoseSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'bloodPressureDiastolic',
        fetcher: AppleHealthKit.getBloodPressureSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'bloodPressureSystolic',
        fetcher: AppleHealthKit.getBloodPressureSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'bodyTemperature',
        fetcher: AppleHealthKit.getBodyTemperatureSamples,
        options: { startDate: startDateISOString },
      },
      {
        key: 'oxygenSaturation',
        fetcher: AppleHealthKit.getOxygenSaturationSamples,
        options: { startDate: startDateISOString },
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

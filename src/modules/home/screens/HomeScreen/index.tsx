import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import { useCTheme } from '@hooks/useCTheme';
import { useAppDispatch } from '@store/index';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      // Activity
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,

      // Body Measurements
      AppleHealthKit.Constants.Permissions.BodyFatPercentage,
      AppleHealthKit.Constants.Permissions.Height,
      AppleHealthKit.Constants.Permissions.LeanBodyMass,
      AppleHealthKit.Constants.Permissions.Weight,
      AppleHealthKit.Constants.Permissions.WaistCircumference,

      // Hearing
      AppleHealthKit.Constants.Permissions.EnvironmentalAudioExposure,
      AppleHealthKit.Constants.Permissions.HeadphoneAudioExposure,

      // Heart
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.RestingHeartRate,
      AppleHealthKit.Constants.Permissions.WalkingHeartRateAverage,
      AppleHealthKit.Constants.Permissions.HeartRateVariability,

      // Mental Wellbeing
      AppleHealthKit.Constants.Permissions.MindfulSession,

      // Mobility
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.RunningSpeed,

      // Nutrition
      AppleHealthKit.Constants.Permissions.EnergyConsumed,
      AppleHealthKit.Constants.Permissions.Water,

      // Respiratory
      AppleHealthKit.Constants.Permissions.RespiratoryRate,

      // Sleep
      AppleHealthKit.Constants.Permissions.SleepAnalysis,

      // Vitals
      AppleHealthKit.Constants.Permissions.BloodGlucose,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
      AppleHealthKit.Constants.Permissions.OxygenSaturation,
    ],
    write: [],
  },
};

type HealthData = {
  [key: string]: HealthValue[] | undefined;
};

export const Home = ({ navigation }: TabStackScreenProps<'home'>): JSX.Element => {
  const { isLightTheme } = useCTheme();
  const [healthData, setHealthData] = useState<HealthData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        setError(error);
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
      // Activity
      { key: 'stepCount', fetcher: AppleHealthKit.getDailyStepCountSamples, options: { startDate: startDateISOString } },
      { key: 'distanceWalkingRunning', fetcher: AppleHealthKit.getDailyDistanceWalkingRunningSamples, options: { startDate: startDateISOString } },
      { key: 'activeEnergyBurned', fetcher: AppleHealthKit.getActiveEnergyBurned, options: { startDate: startDateISOString } },
  
      // Body Measurements
      { key: 'bodyFatPercentage', fetcher: AppleHealthKit.getBodyFatPercentageSamples, options: { startDate: startDateISOString } },
      { key: 'height', fetcher: AppleHealthKit.getHeightSamples, options: { startDate: startDateISOString } },
      { key: 'leanBodyMass', fetcher: AppleHealthKit.getLeanBodyMassSamples, options: { startDate: startDateISOString } },
      { key: 'weight', fetcher: AppleHealthKit.getWeightSamples, options: { startDate: startDateISOString } },
      { key: 'waistCircumference', fetcher: AppleHealthKit.getWaistCircumferenceSamples, options: { startDate: startDateISOString } },
  
      // Hearing
      { key: 'environmentalAudioExposure', fetcher: AppleHealthKit.getEnvironmentalAudioExposure, options: { startDate: startDateISOString } },
      { key: 'headphoneAudioExposure', fetcher: AppleHealthKit.getHeadphoneAudioExposure, options: { startDate: startDateISOString } },
  
      // Heart
      { key: 'heartRate', fetcher: AppleHealthKit.getHeartRateSamples, options: { startDate: startDateISOString } },
      { key: 'restingHeartRate', fetcher: AppleHealthKit.getRestingHeartRateSamples, options: { startDate: startDateISOString } },
      { key: 'walkingHeartRateAverage', fetcher: AppleHealthKit.getWalkingHeartRateAverage, options: { startDate: startDateISOString } },
      { key: 'heartRateVariability', fetcher: AppleHealthKit.getHeartRateVariabilitySamples, options: { startDate: startDateISOString } },
  
      // Mental Wellbeing
      { key: 'mindfulSession', fetcher: AppleHealthKit.getMindfulSession, options: { startDate: startDateISOString } },
  
      // Mobility
      { key: 'stepLength', fetcher: AppleHealthKit.getStepCount, options: { startDate: startDateISOString } },
      { key: 'sixMinuteWalkTestDistance', fetcher: AppleHealthKit.getDistanceWalkingRunning, options: { startDate: startDateISOString } },
      { key: 'walkingSpeed', fetcher: AppleHealthKit.getDailyDistanceWalkingRunningSamples, options: { startDate: startDateISOString } },
  
      // Nutrition
      { key: 'dietaryEnergyConsumed', fetcher: AppleHealthKit.getEnergyConsumedSamples, options: { startDate: startDateISOString } },
      { key: 'water', fetcher: AppleHealthKit.getWaterSamples, options: { startDate: startDateISOString } },
  
      // Respiratory
      { key: 'respiratoryRate', fetcher: AppleHealthKit.getRespiratoryRateSamples, options: { startDate: startDateISOString } },
  
      // Sleep
      { key: 'sleepAnalysis', fetcher: AppleHealthKit.getSleepSamples, options: { startDate: startDateISOString } },
  
      // Vitals
      { key: 'bloodGlucose', fetcher: AppleHealthKit.getBloodGlucoseSamples, options: { startDate: startDateISOString } },
      { key: 'bloodPressureDiastolic', fetcher: AppleHealthKit.getBloodPressureSamples, options: { startDate: startDateISOString } },
      { key: 'bloodPressureSystolic', fetcher: AppleHealthKit.getBloodPressureSamples, options: { startDate: startDateISOString } },
      { key: 'bodyTemperature', fetcher: AppleHealthKit.getBodyTemperatureSamples, options: { startDate: startDateISOString } },
      { key: 'oxygenSaturation', fetcher: AppleHealthKit.getOxygenSaturationSamples, options: { startDate: startDateISOString } },
    ];
  
    const fetchAllData = async () => {
      const results: Partial<HealthData> = {};
  
      for (const { key, fetcher, options } of dataFetchers) {
        await new Promise<void>((resolve) => {
          fetcher(options, (callbackError: string, data: any) => {
            console.log()
            if (callbackError) {
              setError(callbackError);
            } else {
              results[key as keyof HealthData] = data;
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

  const renderData = (title: string, data?: HealthValue[]) => {
    if (!data || !Array.isArray(data) ) return null;

    return (
      <View style={styles.dataContainer}>
        <CText size="xl" style={styles.dataTitle}>{title}</CText>
        {data.slice(0, 10).map((item, index) => (
          <Text key={index} style={styles.dataText}>
            {item?.value} at {new Date(item?.startDate).toLocaleString()}
          </Text>
        ))}
      </View>
    );
  };
  console.log(healthData.mindfulSession)

  return (
    <Screen withoutBottomEdge containerStyles={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.section}>
          <CText size="lg" style={styles.headerText}>Health Data</CText>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {renderData('Steps', healthData.stepCount)}
          {renderData('Distance Walking/Running', healthData.distanceWalkingRunning)}
          {renderData('Active Energy Burned', healthData.activeEnergyBurned)}
      {renderData('Body Fat Percentage', healthData.bodyFatPercentage)}
      {renderData('Height', healthData.height)}
      {renderData('Lean Body Mass', healthData.leanBodyMass)}
      {renderData('Weight', healthData.weight)}
      {renderData('Waist Circumference', healthData.waistCircumference)}
      {renderData('Environmental Audio Exposure', healthData.environmentalAudioExposure)}
      {renderData('Headphone Audio Exposure', healthData.headphoneAudioExposure)}
      {renderData('Heart Rate', healthData.heartRate)}
      {renderData('Resting Heart Rate', healthData.restingHeartRate)}
      {renderData('Walking Heart Rate Average', healthData.walkingHeartRateAverage)}
      {renderData('Heart Rate Variability', healthData.heartRateVariability)}
      {renderData('Mindful Sessions', healthData.mindfulSession)}
      {renderData('Step Length', healthData.stepLength)}
      {renderData('Six Minute Walk Test Distance', healthData.sixMinuteWalkTestDistance)}
      {renderData('Walking Speed', healthData.walkingSpeed)}
      {renderData('Dietary Energy Consumed', healthData.dietaryEnergyConsumed)}
      {renderData('Water', healthData.water)}
      {renderData('Respiratory Rate', healthData.respiratoryRate)}
      {renderData('Sleep Analysis', healthData.sleepAnalysis)}
      {renderData('Blood Glucose', healthData.bloodGlucose)}
      {renderData('Blood Pressure Diastolic', healthData.bloodPressureDiastolic)}
      {renderData('Blood Pressure Systolic', healthData.bloodPressureSystolic)}
      {renderData('Body Temperature', healthData.bodyTemperature)}
      {renderData('Oxygen Saturation', healthData.oxygenSaturation)}
    </View>
  </ScrollView>
</Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  scrollViewContainer: {
    paddingVertical: 20,
  },
  section: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataContainer: {
    marginBottom: 20,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 2,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'red',
  },
});

export default Home;
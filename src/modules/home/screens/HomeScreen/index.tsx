import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { LoadingAndError } from '@modules/home/components/Loading';
import { HealthDataRenderer } from '@modules/home/components/HealthDataRenderer';
import { useFetchHealthData } from '@modules/home/viewModel/FetchHealthData';
import { useWeather } from '@hooks/weather';
import { Segment, SegmentType } from '@components/Segment/Segment';
import { Screen } from '@components/Screen';
import NestedRingChart from '@modules/home/components/charts/ringChart/NestedRingChart';
import { Colors } from '@constants/Colors';
import { DateSelector } from '@components/DatePicker/DatePicker';
import { ConditionalRenderer } from '@components/ConditionalRenderer';

export const Home: React.FC = () => {
  const {
    healthData,
    loading: healthDataLoading,
    error: healthDataError,
  } = useFetchHealthData();
  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather();
  const [currentSegment, setCurrentSegment] = useState<SegmentType>('overview');

  const strain = 0.59;
  const recovery = 0.17;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
  return (
    <Screen fullscreen withoutTopEdge containerStyles={styles.container}>
      <DateSelector
        initialDate={selectedDate}
        onDateChange={handleDateChange}
      />

      <Segment
        currentSegment={currentSegment}
        onSegmentPress={setCurrentSegment}
      />
      <ConditionalRenderer show={currentSegment === 'overview'}>
        {weather && (
          <>
            <CText>City: {weather.city}</CText>
            <CText>Temperature: {weather.temperature}°C</CText>
            <CText>Description: {weather.description}</CText>
          </>
        )}
        <NestedRingChart
          size={100}
          strokeWidthOuter={7}
          progressOuter={strain}
          colorOuter={Colors.deepRed}
          strokeWidthInner={7}
          progressInner={recovery}
          colorInner={Colors.grey2}
        />
      </ConditionalRenderer>
      <ConditionalRenderer show={currentSegment === 'Sleep'}>
        <HealthDataRenderer
          title="Sleep Analysis"
          data={healthData.sleepAnalysis}
        />
        <HealthDataRenderer
          title="Heart Rate Variability"
          data={healthData.heartRateVariability}
        />
        <HealthDataRenderer
          title="Respiratory Rate"
          data={healthData.respiratoryRate}
        />
      </ConditionalRenderer>

      <ConditionalRenderer show={currentSegment === 'Recovery'}>
        <HealthDataRenderer
          title="Body Fat Percentage"
          data={healthData.bodyFatPercentage}
        />
        <HealthDataRenderer title="Weight" data={healthData.weight} />
        <HealthDataRenderer
          title="Lean Body Mass"
          data={healthData.leanBodyMass}
        />
        <HealthDataRenderer title="Height" data={healthData.height} />
      </ConditionalRenderer>
      <ConditionalRenderer show={currentSegment === 'Strain'}>
        <HealthDataRenderer title="Step Count" data={healthData.stepCount} />
        <HealthDataRenderer
          title="Distance Walking/Running"
          data={healthData.distanceWalkingRunning}
        />
        <HealthDataRenderer
          title="Active Energy Burned"
          data={healthData.activeEnergyBurned}
        />
        <HealthDataRenderer
          title="Walking Speed"
          data={healthData.walkingSpeed}
        />
      </ConditionalRenderer>

      <LoadingAndError loading={healthDataLoading} error={healthDataError} />
      <LoadingAndError loading={weatherLoading} error={weatherError} />

      <ScrollView style={styles.dataContainer}>
        {healthData && (
          <>
            <HealthDataRenderer
              title="Step Count"
              data={healthData.stepCount}
            />
            <HealthDataRenderer
              title="Distance Walking/Running"
              data={healthData.distanceWalkingRunning}
            />
            <HealthDataRenderer
              title="Active Energy Burned"
              data={healthData.activeEnergyBurned}
            />
            <HealthDataRenderer
              title="Body Fat Percentage"
              data={healthData.bodyFatPercentage}
            />
            <HealthDataRenderer title="Height" data={healthData.height} />
            <HealthDataRenderer
              title="Lean Body Mass"
              data={healthData.leanBodyMass}
            />
            <HealthDataRenderer title="Weight" data={healthData.weight} />
            <HealthDataRenderer
              title="Waist Circumference"
              data={healthData.waistCircumference}
            />
            <HealthDataRenderer
              title="Environmental Audio Exposure"
              data={healthData.environmentalAudioExposure}
            />
            <HealthDataRenderer
              title="Headphone Audio Exposure"
              data={healthData.headphoneAudioExposure}
            />
            <HealthDataRenderer
              title="Heart Rate"
              data={healthData.heartRate}
            />
            <HealthDataRenderer
              title="Resting Heart Rate"
              data={healthData.restingHeartRate}
            />
            <HealthDataRenderer
              title="Walking Heart Rate Average"
              data={healthData.walkingHeartRateAverage}
            />
            <HealthDataRenderer
              title="Heart Rate Variability"
              data={healthData.heartRateVariability}
            />
            <HealthDataRenderer
              title="Mindful Session"
              data={healthData.mindfulSession}
            />
            <HealthDataRenderer
              title="Step Length"
              data={healthData.stepLength}
            />
            <HealthDataRenderer
              title="Six Minute Walk Test Distance"
              data={healthData.sixMinuteWalkTestDistance}
            />
            <HealthDataRenderer
              title="Walking Speed"
              data={healthData.walkingSpeed}
            />
            <HealthDataRenderer
              title="Dietary Energy Consumed"
              data={healthData.dietaryEnergyConsumed}
            />
            <HealthDataRenderer title="Water" data={healthData.water} />
            <HealthDataRenderer
              title="Respiratory Rate"
              data={healthData.respiratoryRate}
            />
            <HealthDataRenderer
              title="Sleep Analysis"
              data={healthData.sleepAnalysis}
            />
            <HealthDataRenderer
              title="Blood Glucose"
              data={healthData.bloodGlucose}
            />
            <HealthDataRenderer
              title="Blood Pressure (Diastolic)"
              data={healthData.bloodPressureDiastolic}
            />
            <HealthDataRenderer
              title="Blood Pressure (Systolic)"
              data={healthData.bloodPressureSystolic}
            />
            <HealthDataRenderer
              title="Body Temperature"
              data={healthData.bodyTemperature}
            />
            <HealthDataRenderer
              title="Oxygen Saturation"
              data={healthData.oxygenSaturation}
            />
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    gap: 12,
    paddingTop: 40,
  },
  dataContainer: {
    marginVertical: 10,
  },
});

export default Home;

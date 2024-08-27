import React from 'react';
import { HealthDataRenderer } from '@modules/home/components/HealthDataRenderer';
import { ConditionalRenderer } from '@components/ConditionalRenderer';
import { HealthData } from '../viewModel/FetchHealthData';
import { SleepAnalysisRenderer } from '@components/SleepAnalysis';

interface SegmentedDataDisplayProps {
  segment: string;
  healthData: HealthData;
}

export const SegmentedDataDisplay = ({
  segment,
  healthData,
}: SegmentedDataDisplayProps) => {
  return (
    <>
      <ConditionalRenderer show={segment === 'Sleep'}>
        <SleepAnalysisRenderer data={healthData.sleepAnalysis} />
        <HealthDataRenderer
          title="Heart Rate Variability"
          data={healthData.heartRateVariability}
        />
        <HealthDataRenderer
          title="Respiratory Rate"
          data={healthData.respiratoryRate}
        />
      </ConditionalRenderer>

      <ConditionalRenderer show={segment === 'Recovery'}>
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

      <ConditionalRenderer show={segment === 'Strain'}>
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

      {/* Adding all other available health data */}
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
      <HealthDataRenderer title="Heart Rate" data={healthData.heartRate} />
      <HealthDataRenderer
        title="Resting Heart Rate"
        data={healthData.restingHeartRate}
      />
      <HealthDataRenderer
        title="Walking Heart Rate Average"
        data={healthData.walkingHeartRateAverage}
      />
      <HealthDataRenderer
        title="Mindful Session"
        data={healthData.mindfulSession}
      />
      <HealthDataRenderer
        title="Six Minute Walk Test Distance"
        data={healthData.sixMinuteWalkTestDistance}
      />
      <HealthDataRenderer
        title="Dietary Energy Consumed"
        data={healthData.dietaryEnergyConsumed}
      />
      <HealthDataRenderer title="Water" data={healthData.water} />
      <HealthDataRenderer
        title="Blood Glucose"
        data={healthData.bloodGlucose}
      />
      <HealthDataRenderer
        title="Blood Pressure Diastolic"
        data={healthData.bloodPressureDiastolic}
      />
      <HealthDataRenderer
        title="Blood Pressure Systolic"
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
  );
};

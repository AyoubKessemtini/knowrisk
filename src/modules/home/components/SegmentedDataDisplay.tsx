import React from 'react';
import { HealthDataRenderer } from '@modules/home/components/HealthDataRenderer';
import { ConditionalRenderer } from '@components/ConditionalRenderer';
import { HealthData } from '../viewModel/FetchHealthData';

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
    </>
  );
};

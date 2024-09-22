import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { MainHeader } from '@components/Headers/MainHeader';
import { PatientInfoCard } from '@components/Cards/GeneralPatientInformationsCard';
import { useFetchHealthData } from '@modules/home/viewModel/FetchHealthData';
import { DateSelector } from '@components/DatePicker/DatePicker';
import { format } from 'date-fns';

import {
  useGetActivitiesByDate,
  useGetMerchantByIdQuery,
  useGetSleepByDate,
  useGetSpo2ByDate,
  useGetStressByDate,
} from '@query/queries/fitBit/fitBitMutations';
import { SleepCard } from '@components/Cards/SleepCard';
import { CText } from '@components/CText';
import { StressLevelCard } from '@components/Cards/StressLevelIndicator';
import { RecoveryComponent } from '@components/Cards/RecoveryCard';
import { Colors } from '@constants/Colors';
import { ProgressCard } from '@components/Cards/ProgressCard';

export const SleepScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch health data for the selected date
  const { healthData } = useFetchHealthData(selectedDate);

  // Fetch weather data

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
  const { data: hrvData } = useGetMerchantByIdQuery({ date: '2024-09-14' });
  const { data: sleepData } = useGetSleepByDate({ date: '2024-09-16' });
  const { data: stressData } = useGetStressByDate({ date: '2024-09-16' });
  const { data: spo2Data } = useGetSpo2ByDate({ date: '2024-09-16' });
  const { data: activitiesData } = useGetActivitiesByDate({
    date: '2024-09-16',
  });

  // Use the latest health data directly from the hook
  // const heartRateData = {
  //   data: healthData?.heartRate?.[0]?.value || 'N/A',
  //   lastUpdated: formatTime(healthData?.heartRate?.[0]?.endDate || ''),
  // };
  // const restingHeartRateData =
  //   healthData?.restingHeartRate?.[0]?.value || 'N/A';
  // const stepsData = {
  //   data: healthData?.stepCount?.[0]?.value || 0,
  //   lastUpdated: formatTime(healthData?.stepCount?.[0]?.endDate || ''),
  // };

  console.log('hrv data', hrvData);
  console.log('sleep data :', sleepData);
  console.log('stress data :', stressData);
  console.log('spo2 data :', spo2Data);
  console.log('activities data :', activitiesData);
  console.log(healthData.oxygen);
  const bloodOxygenData = healthData?.oxygen?.[0] || null;
  const respiratoryRateData = healthData?.respiratoryRate?.[0] || null;

  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <MainHeader firstName="Aziz" lastName="Sassi" />
      <View style={styles.wrapper}>
        <PatientInfoCard
          name="George Frank"
          id="ID5434A533"
          lastSeizure="Sun, Apr 07, 22:54"
          seizureFrequency="Weekly"
          seizureRisk="Moderate"
          seizureForecast="Moderate"
          isDevicePaired={true}
        />
        {/* <ReportSeizureCard onPress={() => {}} /> */}
        <DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <CText size="lg_semiBold" color="black">
          Last Sleep Statistic
        </CText>
        <View style={styles.row}>
          <SleepCard
            lastUpdated={'10:33AM'}
            sleepData="67"
            title="common.quality"
            unit="%"
          />
          <SleepCard
            lastUpdated={'10:33AM'}
            sleepData="2.390"
            title="common.quality"
            unit="Sec"
          />
        </View>
        <View style={styles.row}>
          <StressLevelCard
            date="10/10/2013"
            stressLevels={{ low: '22:23', good: '11:00', high: '3:14' }}
            progress={{ low: 33, good: 33, high: 33 }}
            comparison={{ low: 10, good: 50, high: 90 }}
          />
          {/* <Journal /> */}

          {/* <WearableCard lastConnection={formatTime(new Date().toISOString())} minutesDuration={750} /> */}
        </View>
        <View style={styles.row}>
          <RecoveryComponent
            title="Rest and Recovery Status"
            value={46}
            maxValue={100}
            description="Lorem Ipsum is simply dummy text of the printing "
            onPress={() => {}}
            activeStrokeColor={Colors.yellow2}
            inActiveStrokeColor={Colors.lightPurple}
          />
        </View>

        <View style={styles.row}>
          <ProgressCard
            title="Blood oxygen"
            value={bloodOxygenData?.value ? bloodOxygenData.value : 0}
            unit="%"
            maxValue={100}
            lastUpdated={
              bloodOxygenData?.endDate
                ? format(new Date(bloodOxygenData?.endDate), 'hh:mm A')
                : 'N/A'
            }
            activeStrokeColor={Colors.green2}
            inActiveStrokeColor={Colors.grey1}
          />

          <ProgressCard
            title="Respiratory rate"
            value={respiratoryRateData?.value ? respiratoryRateData.value : 0}
            unit="RPM"
            maxValue={50}
            lastUpdated={
              respiratoryRateData?.endDate
                ? format(new Date(respiratoryRateData?.endDate), 'hh:mm A')
                : 'N/A'
            }
            activeStrokeColor={Colors.green2}
            inActiveStrokeColor={Colors.grey1}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  wrapper: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

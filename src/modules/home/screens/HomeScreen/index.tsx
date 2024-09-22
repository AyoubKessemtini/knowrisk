import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { MainHeader } from '@components/Headers/MainHeader';
import { PatientInfoCard } from '@components/Cards/GeneralPatientInformationsCard';
import { WeatherCard } from '@components/Cards/WeatherCard';
import { StepsCard } from '@components/Cards/StepsCard';
import { RootStackRoutes } from '../../../../navigators/routes';
import { useNavigation } from '@react-navigation/native';

import { useFetchHealthData } from '@modules/home/viewModel/FetchHealthData';
import { DateSelector } from '@components/DatePicker/DatePicker';
import { useWeather } from '@hooks/weather';
import { formatTime } from '@hooks/useDateFormatter';

// import {
//   useGetActivitiesByDate,
//   useGetMerchantByIdQuery,
//   useGetSleepByDate,
//   useGetSpo2ByDate,
//   useGetStressByDate,
// } from '@query/queries/fitBit/fitBitMutations';
import { ReportSeizureCard } from '@components/Cards/ReportSeizureCard';
import { CText } from '@components/CText';
import { SleepCard } from '@components/Cards/SleepCard';
import { StressLevelCard } from '@components/Cards/StressLevelIndicator';
import { RecoveryComponent } from '@components/Cards/RecoveryCard';
import { Colors } from '@constants/Colors';
// import { ProgressCard } from '@components/Cards/ProgressCard';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();

  // Fetch health data for the selected date
  const { healthData } = useFetchHealthData(selectedDate);

  // Fetch weather data
  const { weather } = useWeather();

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  // Mock data from queries for display fallback
  // const { data: hrvData } = useGetMerchantByIdQuery({ date: '2024-09-14' }) || {
  //   data: { hrv: '50 ms' },
  // };
  // const { data: sleepData } = useGetSleepByDate({ date: '2024-09-16' }) || {
  //   data: { quality: 70, duration: '7h 30m' },
  // };
  // const { data: stressData } = useGetStressByDate({ date: '2024-09-16' }) || {
  //   data: { low: '10h', good: '5h', high: '9h' },
  // };
  // const { data: spo2Data } = useGetSpo2ByDate({ date: '2024-09-16' }) || {
  //   data: { spo2: 98 },
  // };
  // const { data: activitiesData } = useGetActivitiesByDate({
  //   date: '2024-09-16',
  // }) || { data: { steps: 4500 } };

  // Fallback for health data
  const heartRateData = {
    data: healthData?.heartRate?.[0]?.value || '73',
    lastUpdated: formatTime(
      healthData?.heartRate?.[0]?.endDate || new Date().toISOString(),
    ),
  };
  // const restingHeartRateData = healthData?.restingHeartRate?.[0]?.value || '64';
  const stepsData = {
    data: healthData?.stepCount?.[0]?.value || 4000,
    lastUpdated:
      healthData?.stepCount?.length > 0
        ? formatTime(healthData?.stepCount?.[0]?.endDate)
        : formatTime(new Date().toISOString()),
  };
  // const bloodOxygenData = healthData?.oxygen?.[0] || {
  //   value: 98,
  //   endDate: new Date().toISOString(),
  // };
  const respiratoryRateData = healthData?.respiratoryRate?.[0] || {
    value: 17,
    endDate: new Date().toISOString(),
  };

  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <MainHeader firstName="Firas" lastName="R" />
      <View style={styles.wrapper}>
        <PatientInfoCard
          name="Firas Rhaeim"
          id="ID5434A533"
          lastSeizure="Sun, Apr 07, 22:54"
          seizureFrequency="Weekly"
          seizureRisk="Moderate"
          isDevicePaired={true}
          mood="happy"
          heartRate={heartRateData?.data}
        />
        <ReportSeizureCard
          onPress={() => {
            navigation.navigate(RootStackRoutes.REPORT_SEIZURE_INTRO_SCREEN);
          }}
        />
        <DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <View style={styles.row}>
          <WeatherCard
            lastUpdated={formatTime(new Date().toISOString())}
            temperature={Math.round(Number(weather?.temperature) || 26)}
          />
          <StepsCard
            lastUpdated={stepsData.lastUpdated}
            steps={stepsData.data.toFixed(0) || 4000}
          />
        </View>
        <View style={styles.row}>
          <RecoveryComponent
            title="Respiratory rate"
            value={respiratoryRateData.value}
            maxValue={30}
            unit="RPM"
            onPress={() => {}}
            activeStrokeColor={Colors.yellow2}
            inActiveStrokeColor={Colors.lightPurple}
            description={
              respiratoryRateData.endDate
                ? formatTime(respiratoryRateData.endDate)
                : formatTime(new Date().toISOString())
            }
          />
        </View>
        <View style={styles.row}>
          <StressLevelCard
            date={formatTime(new Date().toISOString())}
            stressLevels={{ low: '10h', good: '7h', high: '5h' }}
            progress={{ low: 42, good: 33, high: 25 }}
            comparison={{ low: 30, good: 40, high: 30 }}
          />
        </View>
        <CText size="lg_semiBold" color="black">
          Last Sleep Statistic
        </CText>
        <View style={styles.row}>
          <SleepCard
            lastUpdated={formatTime(new Date().toISOString())}
            sleepData={'67'}
            title="common.quality"
            unit="%"
          />
          <SleepCard
            lastUpdated={formatTime(new Date().toISOString())}
            sleepData={'2h 30m'}
            title="common.average"
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
    paddingBottom: 40,
  },
  wrapper: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  // column: {
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   width: '50%',
  // },
});

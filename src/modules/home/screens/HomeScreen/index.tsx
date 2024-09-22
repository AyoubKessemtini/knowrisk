import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { MainHeader } from '@components/Headers/MainHeader';
import { PatientInfoCard } from '@components/Cards/GeneralPatientInformationsCard';
import { WeatherCard } from '@components/Cards/WeatherCard';
import { StepsCard } from '@components/Cards/StepsCard';
import { LocationWeather } from '@components/Cards/LocationWeatherCard';
import { WeeklyHeartInfosCard } from '@components/Cards/WeeklyHeartInfosCard';
import { RootStackRoutes } from '../../../../navigators/routes';
import { useNavigation } from '@react-navigation/native';

import { useFetchHealthData } from '@modules/home/viewModel/FetchHealthData';
import { DateSelector } from '@components/DatePicker/DatePicker';
import { useWeather } from '@hooks/weather';
import { formatTime } from '@hooks/useDateFormatter';
import { Journal } from '@components/Cards/JournalCard';
import { MoodCard } from '@components/Cards/MoodCard';

import {
  useGetActivitiesByDate,
  useGetMerchantByIdQuery,
  useGetSleepByDate,
  useGetSpo2ByDate,
  useGetStressByDate,
} from '@query/queries/fitBit/fitBitMutations';
import { ReportSeizureCard } from '@components/Cards/ReportSeizureCard';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();
  // const {
  //   healthData,
  //   loading: healthDataLoading,
  //   error: healthDataError,
  // } = useFetchHealthData(selectedDate);
  const {
    weather,
    // loading: weatherLoading,
    // error: weatherError,
  } = useWeather();
  // const [currentSegment, setCurrentSegment] = useState<SegmentType>('overview');


  // Fetch health data for the selected date
  const { healthData } = useFetchHealthData(selectedDate);


  // Fetch weather data
  const { weather } = useWeather();

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
  const heartRateData = {
    data: healthData?.heartRate?.[0]?.value || 'N/A',
    lastUpdated: formatTime(healthData?.heartRate?.[0]?.endDate || ''),
  };
  const restingHeartRateData =
    healthData?.restingHeartRate?.[0]?.value || 'N/A';
  const stepsData = {
    data: healthData?.stepCount?.[0]?.value || 0,
    lastUpdated: formatTime(healthData?.stepCount?.[0]?.endDate || ''),
  };

  console.log('hrv data', hrvData);
  console.log('sleep data :', sleepData);
  console.log('stress data :', stressData);
  console.log('spo2 data :', spo2Data);
  console.log('activities data :', activitiesData);
  console.log(healthData);

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
            temperature={Math.round(Number(weather?.temperature))}
          />
          <StepsCard
            lastUpdated={stepsData.lastUpdated}
            steps={stepsData.data}
          />
        </View>
        <View style={styles.row}>
          <Journal />

          {/* <WearableCard lastConnection={formatTime(new Date().toISOString())} minutesDuration={750} /> */}
        </View>
        <View style={styles.row}>
          <WeeklyHeartInfosCard
            lastUpdated={heartRateData?.lastUpdated}
            heartRateData={heartRateData?.data as string}
            restingHeartRateData={restingHeartRateData as string}
            date={heartRateData?.lastUpdated}
          />
          <View style={styles.column}>
            <LocationWeather
              description={weather?.description as string}
              city={weather?.city as string}
              lastUpdated={formatTime(new Date().toISOString())}
              temperature={Math.round(Number(weather?.temperature))}
            />
            <MoodCard
              mood="Happy"
              percentage={80}
              lastUpdated={formatTime(new Date().toISOString())}
              icon="https://w7.pngwing.com/pngs/296/845/png-transparent-smiley-happiness-icon-happy-miscellaneous-text-emoticon.png"
            />
          </View>
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
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '50%',
  },
});

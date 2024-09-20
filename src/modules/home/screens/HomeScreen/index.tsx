import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
// import { CText } from '@components/CText';
// import { LoadingErrorWrapper } from '@components/LoadingErrorWrapper';
// import { useFetchHealthData } from '@modules/home/viewModel/FetchHealthData';
// import { useWeather } from '@hooks/weather';
// import { Segment, SegmentType } from '@components/Segment/Segment';
import { Screen } from '@components/Screen';
// import NestedRingChart from '@modules/home/components/charts/ringChart/NestedRingChart';
// import { Colors } from '@constants/Colors';
import { DateSelector } from '@components/DatePicker/DatePicker';
// import { ConditionalRenderer } from '@components/ConditionalRenderer';
// import { SegmentedDataDisplay } from '@modules/home/components/SegmentedDataDisplay';
// import { HeartRateChart } from '@components/charts/HeartRateChart';
import { MainHeader } from '@components/Headers/MainHeader';
import { PatientInfoCard } from '@components/Cards/GeneralPatientInformationsCard';
import { ReportSeizureCard } from '@components/Cards/ReportSeizureCard';
import { WeatherCard } from '@components/Cards/WeatherCard';
import { StepsCard } from '@components/Cards/StepsCard';
import { LocationWeather } from '@components/Cards/LocationWeatherCard';
import { useWeather } from '@hooks/weather';
import { WearableCard } from '@components/Cards/WearableCard';
import { WeeklyHeartInfosCard } from '@components/Cards/WeeklyHeartInfosCard';
import {
  useGetActivitiesByDate,
  useGetMerchantByIdQuery,
  useGetSleepByDate,
  useGetSpo2ByDate,
  useGetStressByDate,
} from '@query/queries/fitBit/fitBitMutations';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // const strain = 0.59;
  // const recovery = 0.17;

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

  console.log('hrv data', hrvData);
  console.log('sleep data :', sleepData);
  console.log('stress data :', stressData);
  console.log('spo2 data :', spo2Data);
  console.log('activities data :', activitiesData);
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <MainHeader profilePicture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAs_TDUTeHiZQ1tqLJlvItaBOjcmRTeoSbHw&s" />
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
        <ReportSeizureCard onPress={() => {}} />
        <DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <View style={styles.row}>
          <WeatherCard
            lastUpdated="10:45 AM"
            temperature={Math.round(Number(weather?.temperature))}
          />
          <StepsCard lastUpdated="10:45 AM" steps={335} />
        </View>
        <View style={styles.row}>
          <LocationWeather
            description={weather?.description as string}
            city={weather?.city as string}
            lastUpdated="10:45 AM"
            temperature={Math.round(Number(weather?.temperature))}
          />
          <WearableCard lastConnection="10:45 AM" minutesDuration={750} />
        </View>
        <View style={styles.row}>
          <WeeklyHeartInfosCard
            lastUpdated="11:54 AM"
            heartRateData="91.10"
            restingHeartRateData="91.10"
            date="Yesterday"
          />
          <View style={styles.column}>
            <StepsCard lastUpdated="10:45 AM" steps={335} />
            <StepsCard lastUpdated="10:45 AM" steps={335} />
          </View>
        </View>

        {/* <LocationWeather city={weather?.city as string} lastUpdated='10:45 AM' temperature={Math.round(Number(weather?.temperature))} /> */}
      </View>

      {/* <DateSelector
        initialDate={selectedDate}
        onDateChange={handleDateChange}
      />

      <Segment
        currentSegment={currentSegment}
        onSegmentPress={setCurrentSegment}
      />

      <LoadingErrorWrapper
        loading={weatherLoading || healthDataLoading}
        error={weatherError || healthDataError}
      >
        <ConditionalRenderer show={currentSegment === 'overview'}>
          <NestedRingChart
            size={100}
            strokeWidthOuter={7}
            progressOuter={strain}
            colorOuter={Colors.deepRed}
            strokeWidthInner={7}
            progressInner={recovery}
            colorInner={Colors.grey2}
          />
          {healthData.heartRate && (
            <HeartRateChart
              data={healthData.heartRate.map((rate) => ({
                value: rate.value,
                startDate: rate.startDate,
              }))}
            />
          )}

          {weather && (
            <>
              <CText>City: {weather.city}</CText>
              <CText>Temperature: {weather.temperature}°C</CText>
              <CText>Description: {weather.description}</CText>
            </>
          )}
        </ConditionalRenderer>

        <SegmentedDataDisplay
          segment={currentSegment}
          healthData={healthData}
        />
      </LoadingErrorWrapper> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
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

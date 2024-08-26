import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { LoadingErrorWrapper } from '@components/LoadingErrorWrapper';
import { useFetchHealthData } from '@modules/home/viewModel/FetchHealthData';
import { useWeather } from '@hooks/weather';
import { Segment, SegmentType } from '@components/Segment/Segment';
import { Screen } from '@components/Screen';
import NestedRingChart from '@modules/home/components/charts/ringChart/NestedRingChart';
import { Colors } from '@constants/Colors';
import { DateSelector } from '@components/DatePicker/DatePicker';
import { ConditionalRenderer } from '@components/ConditionalRenderer';
import { SegmentedDataDisplay } from '@modules/home/components/SegmentedDataDisplay';
import { HeartRateChart } from '@components/charts/HeartRateChart';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    healthData,
    loading: healthDataLoading,
    error: healthDataError,
  } = useFetchHealthData(selectedDate);
  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather();
  const [currentSegment, setCurrentSegment] = useState<SegmentType>('overview');

  const strain = 0.59;
  const recovery = 0.17;

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

      <LoadingErrorWrapper
        loading={weatherLoading || healthDataLoading}
        error={weatherError || healthDataError}
      >
        <ConditionalRenderer show={currentSegment === 'overview'}>
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

        <SegmentedDataDisplay
          segment={currentSegment}
          healthData={healthData}
        />
      </LoadingErrorWrapper>
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
});

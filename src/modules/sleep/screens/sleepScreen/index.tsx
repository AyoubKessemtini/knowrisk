import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { DateSelector } from '@components/DatePicker/DatePicker.tsx';
import { formatStringDate } from '@hooks/useDateFormatter.ts';
import { SleepCard } from '@components/Cards/SleepCard.tsx';
import { CText } from '@components/CText.tsx';
//import { SleepQualityCard } from '@modules/sleep/screens/components/sleepQualityCard.tsx';
import { RecoveryComponent } from '@components/Cards/RecoveryCard.tsx';
import { Colors } from '@constants/Colors.ts';
import { core } from '@config/Configuration.ts';
import { SleepStagesChart } from '@modules/sleep/screens/components/SleepStagesChart.tsx';

export const SleepScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sleepData, setSleepData] = useState<SleepData>(null);
  const { width, height } = Dimensions.get('window');
  const w04 = width * 0.04;
  const h10 = height * 0.1;
  console.log(w04, h10);
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const fetchSleepDailyData = async () => {
      try {
        const fetchedData = await core.getSleepDailyData.execute(
          formatStringDate(selectedDate),
        );
        if (fetchedData) {
          setSleepData(fetchedData);
        } else {
          setSleepData(null);
        }
      } catch (error) {
        setSleepData(null);
        console.error('Failed to fetch sleep data:', error);
      }
    };

    fetchSleepDailyData();
  }, [selectedDate]);
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      {/* <MainHeader firstName="Aziz" lastName="Sass" /> */}
      <View style={[styles.wrapper, { paddingHorizontal: w04 }]}>
        <DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <CText size="lg_semiBold" color="black">
          Last Sleep Statistic
        </CText>
        <View style={styles.row}>
          <SleepCard
            lastUpdated={
              sleepData
                ? formatStringDate(selectedDate)
                : formatStringDate(selectedDate)
            }
            sleepData={sleepData ? String(sleepData.sleepQualityScore) : '--'}
            title="common.quality"
            unit="%"
          />
          <SleepCard
            lastUpdated={
              sleepData
                ? formatStringDate(selectedDate)
                : formatStringDate(selectedDate)
            }
            sleepData={sleepData ? String(sleepData.totalSleepDuration) : '--'}
            title="common.average"
          />
        </View>
        {sleepData && (
          <View
            style={[
              styles.sleepStagesContainer,
              { backgroundColor: Colors.lightPurple },
            ]}
          >
            <SleepStagesChart sleepData={sleepData} />
          </View>
        )}
        <View style={styles.row}>
          <SleepCard
            lastUpdated={
              sleepData
                ? formatStringDate(selectedDate)
                : formatStringDate(selectedDate)
            }
            sleepData={sleepData ? String(sleepData.startSleep) : '--'}
            title="common.start_sleep"
          />
          <SleepCard
            lastUpdated={
              sleepData
                ? formatStringDate(selectedDate)
                : formatStringDate(selectedDate)
            }
            sleepData={sleepData ? String(sleepData.endSleep) : '--'}
            title="common.end_sleep"
          />
        </View>
        {/*
        <SleepQualityCard
          sleepQuality={sleepData ? String(sleepData.sleepQualityScore) : '--'}
          date={formatStringDate(selectedDate)}
          sleepDuration={
            sleepData ? String(sleepData.totalSleepDuration) : '--'
          }
          startSleep={sleepData ? String(sleepData.startSleep) : '--'}
          endSleep={sleepData ? String(sleepData.endSleep) : '--'}
        />*/}
        <View style={styles.row}>
          <RecoveryComponent
            title="Rest and Recovery Status"
            value={
              sleepData && sleepData.restAndRecovery
                ? sleepData.restAndRecovery
                : -1
            }
            unit="%"
            onPress={() => {}}
            activeStrokeColor={Colors.yellow2}
            inActiveStrokeColor={Colors.lightPurple}
            description={
              sleepData && sleepData.restAndRecovery
                ? formatStringDate(selectedDate)
                : `${formatStringDate(selectedDate)} (Calculating)`
            }
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
    paddingVertical: 10,
    paddingTop: 50,
    //paddingHorizontal: 20,
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sleepStagesContainer: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

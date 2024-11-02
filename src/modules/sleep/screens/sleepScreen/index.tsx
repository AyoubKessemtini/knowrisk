import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { DateSelector } from '@components/DatePicker/DatePicker.tsx';
import { formatStringDate, formatTime } from '@hooks/useDateFormatter.ts';
import { SleepCard } from '@components/Cards/SleepCard.tsx';
import { CText } from '@components/CText.tsx';
import { LineChart } from 'react-native-chart-kit';
import { SleepQualityCard } from '@modules/sleep/screens/components/sleepQualityCard.tsx';
import { RecoveryComponent } from '@components/Cards/RecoveryCard.tsx';
import { Colors } from '@constants/Colors.ts';

interface SleepData {
  date: string;
  quality: number;
  sleepTime: string;
  startSleep: string;
  endSleep: string;
}
export const SleepScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState<string[]>([]);
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
  const getTargetDate = (date: Date, minusDay: number = 0) => {
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() - minusDay);

    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const sleep: SleepData[] = [
    {
      date: getTargetDate(new Date(selectedDate), 0),
      quality: 57,
      sleepTime: '7h 20m',
      startSleep: '23:00',
      endSleep: '06:20',
    },
    {
      date: getTargetDate(new Date(selectedDate), 1),
      quality: 87,
      sleepTime: '7h 20m',
      startSleep: '23:00',
      endSleep: '06:20',
    },
    {
      date: getTargetDate(new Date(selectedDate), 2),
      quality: 99,
      sleepTime: '7h 20m',
      startSleep: '23:00',
      endSleep: '06:20',
    },
    {
      date: getTargetDate(new Date(selectedDate), 3),
      quality: 57,
      sleepTime: '7h 20m',
      startSleep: '23:00',
      endSleep: '06:20',
    },
    {
      date: getTargetDate(new Date(selectedDate), 4),
      quality: 88,
      sleepTime: '7h 20m',
      startSleep: '23:00',
      endSleep: '06:20',
    },
    {
      date: getTargetDate(new Date(selectedDate), 5),
      quality: 91,
      sleepTime: '8h 11m',
      startSleep: '22:49',
      endSleep: '07:00',
    },
    {
      date: getTargetDate(new Date(selectedDate), 6),
      quality: 45,
      sleepTime: '9h 11m',
      startSleep: '22:49',
      endSleep: '08:00',
    },
  ];

  const getPreviousDays = (): string[] => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const lastFiveDays = [];
    for (let i = 1; i < Object.keys(sleep).length; i++) {
      const previousDay = new Date(Object.keys(sleep)[i]);
      previousDay.setDate(selectedDate.getDate() - i);
      const dayName = daysOfWeek[previousDay.getDay()];
      lastFiveDays.push(dayName);
    }
    return lastFiveDays.reverse();
  };
  useEffect(() => {
    setDays(getPreviousDays());
  }, [selectedDate]);
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      {/* <MainHeader firstName="Aziz" lastName="Sassi" /> */}
      <View style={styles.wrapper}>
        <DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <CText size="lg_semiBold" color="black">
          Last Sleep Statistic
        </CText>
        <View style={styles.row}>
          <SleepCard
            lastUpdated={formatStringDate(selectedDate)}
            sleepData={String(
              sleep.filter(
                (data) => data.date === formatStringDate(selectedDate),
              )[0].quality,
            )}
            title="common.quality"
            unit="%"
          />
          <SleepCard
            lastUpdated={formatTime(new Date().toISOString())}
            sleepData={String(
              sleep.filter(
                (data) => data.date === formatStringDate(selectedDate),
              )[0].sleepTime,
            )}
            title="common.average"
          />
        </View>
        <CText size="lg_semiBold" color="black">
          Last Nights Sleep Rate
        </CText>
        <LineChart
          data={{
            labels: days,
            datasets: [
              {
                data: sleep
                  .reverse()
                  .map((data) => data.quality)
                  .reverse(),
              },
            ],
          }}
          width={350}
          height={250}
          fromZero={true}
          yAxisSuffix="%"
          withHorizontalLines={true}
          withVerticalLines={false}
          withShadow={false}
          xLabelsOffset={3}
          yLabelsOffset={20}
          chartConfig={{
            fillShadowGradientOpacity: 0,
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: () => '#8753bd',
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '1',
              stroke: '#834bbe',
            },
          }}
          style={{
            marginVertical: 12,
          }}
        />
        <SleepQualityCard
          sleepQuality={
            sleep.filter(
              (data) => data.date === formatStringDate(selectedDate),
            )[0].quality
          }
          date={formatStringDate(selectedDate)}
          sleepDuration={String(
            sleep.filter(
              (data) => data.date === formatStringDate(selectedDate),
            )[0].sleepTime,
          )}
          startSleep={
            sleep.filter(
              (data) => data.date === formatStringDate(selectedDate),
            )[0].startSleep
          }
          endSleep={
            sleep.filter(
              (data) => data.date === formatStringDate(selectedDate),
            )[0].endSleep
          }
        />
      </View>
      <View style={styles.row}>
        <RecoveryComponent
          title="Rest and Recovery Status"
          value={44}
          maxValue={30}
          unit="%"
          onPress={() => {}}
          activeStrokeColor={Colors.yellow2}
          inActiveStrokeColor={Colors.lightPurple}
          description={formatStringDate(selectedDate)}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
    gap: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

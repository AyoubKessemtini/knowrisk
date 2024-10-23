import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { DateSelector } from '@components/DatePicker/DatePicker.tsx';
import { formatTime } from '@hooks/useDateFormatter.ts';
import { SleepCard } from '@components/Cards/SleepCard.tsx';
import { CText } from '@components/CText.tsx';
import { LineChart } from 'react-native-chart-kit';
import { SleepQualityCard } from '@modules/sleep/screens/components/sleepQualityCard.tsx';

export const SleepScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState<string[]>([]);
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
  const getPreviousDays = (): string[] => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const lastFourDays = [];
    const today = selectedDate;
    for (let i = 1; i <= 5; i++) {
      const previousDay = new Date(today);
      previousDay.setDate(today.getDate() - i);
      const dayName = daysOfWeek[previousDay.getDay()];
      lastFourDays.push(dayName);
    }
    return lastFourDays.reverse();
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
            lastUpdated={formatTime(new Date().toISOString())}
            sleepData={'67'}
            title="common.quality"
            unit="%"
          />
          <SleepCard
            lastUpdated={formatTime(new Date().toISOString())}
            sleepData={'7h 30m'}
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
                data: [87, 65, 49, 98, 57],
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
            backgroundColor: '#ffffff', // White background color
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, // optional, defaults to 2 decimal places
            color: () => '#8753bd', // Blue line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black label color for better contrast
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
        <SleepQualityCard />
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

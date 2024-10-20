import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { DateSelector } from '@components/DatePicker/DatePicker.tsx';
import { formatTime } from '@hooks/useDateFormatter.ts';
import { SleepCard } from '@components/Cards/SleepCard.tsx';
import { CText } from '@components/CText.tsx';
import { LineChart } from 'react-native-chart-kit';

export const SleepScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
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
      </View>
      <View style={styles.wrapper}>
        <LineChart
          data={{
            labels: ['2024-10-18', '2024-10-19', '2024-10-20', '2024-10-21'],
            datasets: [
              {
                data: [87, 65, 49, 98],
              },
            ],
          }}
          width={380}
          height={300}
          fromZero={true}
          //yAxisMax={100}
          yAxisSuffix="%"
          withHorizontalLines={true}
          withVerticalLines={false}
          chartConfig={{
            fillShadowGradientOpacity: 0,
            backgroundColor: '#ffffff', // White background color
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, // optional, defaults to 2 decimal places
            color: () => '#834bbe', // Blue line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black label color for better contrast
            propsForDots: {
              r: '4',
              strokeWidth: '1',
              stroke: '#834bbe',
            },
          }}
          bezier
          style={{
            marginVertical: 12,
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 80,
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

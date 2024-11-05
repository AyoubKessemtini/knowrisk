import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pallete, PalleteColors } from '@constants/Colors';
import { CText } from '@components/CText.tsx';
import { SleepTimeCard } from '@modules/sleep/screens/components/sleepTimeCard.tsx';
import { SleepQualityChart } from '@modules/sleep/screens/components/sleepQualityChart.tsx';

interface SleepQualityCardProps {
  color?: PalleteColors;
  startSleep: string;
  sleepDuration: string;
  endSleep: string;
  sleepQuality: string;
  date: string;
}

export const SleepQualityCard: React.FC<SleepQualityCardProps> = ({
  color = 'lightPink',
  endSleep,
  sleepDuration,
  startSleep,
  sleepQuality,
  date,
}) => {
  const backgroundColor = pallete[color];
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <CText size="md_medium" color="black">
          Sleep quality
        </CText>
      </View>
      <View style={styles.row}>
        <View style={styles.leftView}>
          <SleepTimeCard title={'Start sleep'} time={startSleep} />
          <SleepTimeCard title={'Sleep duration'} time={sleepDuration} />
          <SleepTimeCard title={'End sleep'} time={endSleep} />
        </View>
        <View style={styles.rightView}>
          <View style={styles.chart}>
            <SleepQualityChart
              sleepQuality={sleepQuality.toString()}
              lastUpdate={date}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',
  },
  leftView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingRight: 5,
  },
  rightView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  chart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

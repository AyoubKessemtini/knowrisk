import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pallete, PalleteColors } from '@constants/Colors';
import { SleepCircleChart } from '@assets/svg/sleepCircleChart';
import { Arrow } from '@modules/sleep/screens/components/arrow.svg.tsx';
import { SleepRates } from '@assets/svg/sleepRates';
import { CText } from '@components/CText.tsx';

interface SleepQualityChartProps {
  color?: PalleteColors;
  progress?: number;
  sleepQuality?: string;
  lastUpdate?: string;
}

export const SleepQualityChart: React.FC<SleepQualityChartProps> = ({
  color = 'white',
  progress = 100,
  sleepQuality = '57',
  lastUpdate = 'today',
}) => {
  const backgroundColor = pallete[color];
  const angle = progress - 90;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <CText mt={5} size="md" color={'grey3'}>
        Quality percentage
      </CText>
      <View style={styles.chartContainer}>
        <SleepCircleChart width={150} height={150} />
        <View
          style={[
            styles.arrowContainer,
            { transform: [{ rotate: `${angle}deg` }] },
          ]}
        >
          <Arrow size={90} />
        </View>
      </View>
      <CText size={'md_semiBold'} mb={15} color={'deepPurple'}>
        {sleepQuality}%
      </CText>
      <SleepRates />
      <CText size={'xs'} mt={15} color={'grey4'}>
        Last update {lastUpdate}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 15,
    width: '100%',
    height: 270,
  },
  chartContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'bottom center',
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@constants/Colors.ts';
import { CText } from '@components/CText.tsx';
import { PieChart } from '@modules/home/components/charts/pieChart.tsx';
import { SeizureTriggers } from '@assets/svg/seizureTriggers';

interface PieChartData {
  name: string;
  value: number; // changed from string to number for chart compatibility
  color: string;
}

interface TriggersCard {
  data: PieChartData[];
}

export const TriggersCard: React.FC<TriggersCard> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ alignItems: 'center' }}>
          <CText mb={5}>Seizure triggers</CText>
          <SeizureTriggers />
        </View>
        <PieChart data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPurple,
    borderRadius: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
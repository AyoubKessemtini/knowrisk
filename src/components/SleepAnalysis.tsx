import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';

interface SleepAnalysisRendererProps {
  data?: Array<{
    startDate: string;
    endDate: string;
    value: number;
  }>;
}

export const SleepAnalysisRenderer = ({ data }: SleepAnalysisRendererProps) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.summaryCard}>
        <CText size="xl_bold">Sleep Analysis</CText>
        <CText>No data to display</CText>
      </View>
    );
  }

  // Calculate total and average sleep duration
  const totalSleep = data.reduce((sum, item) => {
    const start = new Date(item.startDate).getTime();
    const end = new Date(item.endDate).getTime();
    return sum + (end - start);
  }, 0);

  const averageSleep = totalSleep / data.length;

  // Format sleep durations in hours
  const totalSleepHours = (totalSleep / (1000 * 60 * 60)).toFixed(2);
  const averageSleepHours = (averageSleep / (1000 * 60 * 60)).toFixed(2);

  // Format time range
  const startTime = new Date(data[0]?.startDate).toLocaleString();
  const endTime = new Date(data[data.length - 1]?.endDate).toLocaleString();

  return (
    <View style={styles.dataContainer}>
      <CText size="xl_bold">Sleep Analysis</CText>
      <View style={styles.summaryCard}>
        <CText>Total Sleep Duration: {totalSleepHours} hours</CText>
        <CText>Average Sleep Duration: {averageSleepHours} hours</CText>
        <CText>Start Time: {startTime}</CText>
        <CText>End Time: {endTime}</CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    marginBottom: 20,
  },
  summaryCard: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginVertical: 10,
  },
});

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CText } from '@components/CText';
import { HealthValue } from 'react-native-health';
import { Colors } from '@constants/Colors';

interface HealthDataRendererProps {
  title: string;
  data?: HealthValue[];
}

export const HealthDataRenderer = ({
  title,
  data,
}: HealthDataRendererProps) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.summaryCard}>
        <CText size="xl_bold">{title}</CText>
        <CText>No data to display</CText>
      </View>
    );
  }

  const totalValue = data.reduce((sum, item) => sum + (item?.value || 0), 0);
  const averageValue = totalValue / data.length;
  const startTime = new Date(data[0]?.startDate).toLocaleString();
  const endTime = new Date(data[data.length - 1]?.endDate).toLocaleString();

  return (
    <View style={styles.dataContainer}>
      <CText size="xl_bold">{title}</CText>
      <View style={styles.summaryCard}>
        <CText>Total: {totalValue}</CText>
        <CText>Average: {averageValue}</CText>
        <CText>Start Time: {startTime}</CText>
        <CText>End Time: {endTime}</CText>
      </View>
      {data.slice(0, 10).map((item, index) => (
        <CText key={index}>
          {item?.value} at {new Date(item?.startDate).toLocaleString()}
        </CText>
      ))}
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

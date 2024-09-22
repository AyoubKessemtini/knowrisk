import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Colors } from '@constants/Colors'; // Update your color constants import as necessary

type ProgressCardProps = {
  title: string;
  value: number;
  unit: string;
  maxValue: number;
  lastUpdated: string;
  activeStrokeColor?: string;
  inActiveStrokeColor?: string;
};

export const ProgressCard = ({
  title,
  value,
  unit,
  maxValue,
  lastUpdated,
  activeStrokeColor = Colors.green, // default stroke colors if not provided
  inActiveStrokeColor = Colors.lightGreen,
}: ProgressCardProps) => {
  return (
    <View style={styles.container}>
      <CText size="sm_semiBold" color="deepPurple" numberOfLines={1} mb={10}>
        {title}
      </CText>
      <CircularProgress
        value={value}
        maxValue={maxValue}
        radius={45}
        showProgressValue={false}
        activeStrokeColor={activeStrokeColor}
        inActiveStrokeColor={inActiveStrokeColor}
        inActiveStrokeOpacity={0.3}
        activeStrokeWidth={10}
        inActiveStrokeWidth={10}
        duration={1500}
        title={`${value} ${unit}`}
        titleColor={Colors.deepPurple}
        titleStyle={styles.progressTitle}
      />
      <CText mt={10} size="xs" color="grey4">
        Last Update {lastUpdated}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.lightPurple,
    padding: 12,
    borderRadius: 16,
    width: '48%', // Adjust width to make it work in a grid layout
    maxHeight: 180,
    marginVertical: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

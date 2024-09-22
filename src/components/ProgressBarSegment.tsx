import React from 'react';
import { View, StyleSheet } from 'react-native';

type ProgressBarSegmentProps = {
  lowPercentage: number;
  goodPercentage: number;
  highPercentage: number;
  lowColor: string;
  goodColor: string;
  highColor: string;
};

export const ProgressBarSegment = ({
  lowPercentage,
  goodPercentage,
  highPercentage,
  lowColor,
  goodColor,
  highColor,
}: ProgressBarSegmentProps) => {
  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressSegment,
          { flex: lowPercentage, backgroundColor: lowColor },
        ]}
      />
      <View
        style={[
          styles.progressSegment,
          { flex: goodPercentage, backgroundColor: goodColor },
        ]}
      />
      <View
        style={[
          styles.progressSegment,
          { flex: highPercentage, backgroundColor: highColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressSegment: {
    height: '100%',
  },
});

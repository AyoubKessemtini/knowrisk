import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText, TextColors } from '@components/CText';
import { Colors } from '@constants/Colors';

type StressLevelBoxProps = {
  level: string;
  value: string;
  comparison: number;
  color: TextColors;
  dotColor: string;
};

export const StressLevelBox = ({
  level,
  value,
  dotColor,
}: StressLevelBoxProps) => {
  return (
    <View style={styles.levelBox}>
      <View style={[styles.row, { gap: 4 }]}>
        <CText size="xm_bold" color="black">
          {value}
        </CText>
        {/* <View style={styles.percentageBox}>
          <CText size="xs_medium" color={color}>
            {comparison > 0 ? `↑${comparison}%` : `↓${Math.abs(comparison)}%`}
          </CText>
        </View> */}
      </View>
      <View style={[styles.row, { gap: 5, paddingTop: 5 }]}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <CText size="sm_medium" color="grey3">
          {level}
        </CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  levelBox: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '32%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    padding: 3,
    borderRadius: 5,
  },
});

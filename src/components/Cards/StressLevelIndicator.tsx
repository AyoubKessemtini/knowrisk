import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-easy-icon';
import { StressLevelBox } from './StressLevelBox';
import { ProgressBarSegment } from '@components/ProgressBarSegment';

type StressLevelCardProps = {
  date: string;
  stressLevels: {
    low: string;
    good: string;
    high: string;
  };
  progress: {
    low: number;
    good: number;
    high: number;
  };
  comparison: {
    low: number;
    good: number;
    high: number;
  };
};

export const StressLevelCard = ({
  date,
  stressLevels,
  progress,
  comparison,
}: StressLevelCardProps) => {
  const totalProgress = progress.low + progress.good + progress.high;
  const lowPercentage = (progress.low / totalProgress) * 100;
  const goodPercentage = (progress.good / totalProgress) * 100;
  const highPercentage = (progress.high / totalProgress) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.row, { gap: 5 }]}>
        <Icon type="entypo" name="heart" size={15} color={Colors.purple1} />
        <CText
          size="xm_semiBold"
          color="purple1"
          text="sleep_screen.stressLevel"
        />
      </View>
      <CText
        size="xs_medium"
        color="grey3"
      >
        Date: {date}
      </CText>

      {/* Custom segmented progress bar */}
      <ProgressBarSegment
        lowPercentage={lowPercentage}
        goodPercentage={goodPercentage}
        highPercentage={highPercentage}
        lowColor={Colors.yellow2}
        goodColor={Colors.green2}
        highColor={Colors.red}
      />

      <View style={styles.levelsRow}>
        <StressLevelBox
          level="Low"
          value={stressLevels.low}
          comparison={comparison.low}
          color="deepPurple"
          dotColor={Colors.yellow2}
        />
        <StressLevelBox
          level="Good"
          value={stressLevels.good}
          comparison={comparison.good}
          color="deepPurple"
          dotColor={Colors.green2}
        />
        <StressLevelBox
          level="High"
          value={stressLevels.high}
          comparison={comparison.high}
          color="deepPurple"
          dotColor={Colors.red}
        />
      </View>

      {/* <View style={styles.infoBox}>
        <CText size="xs_medium" color="black">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </CText>
        <Icon type="antdesign" name="right" size={25} color={Colors.purple1} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPurple,
    borderRadius: 12,
    padding: 15,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  // infoBox: {
  //   backgroundColor: Colors.midPurple,
  //   borderRadius: 8,
  //   padding: 10,
  //   marginTop: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 5,
  //   width: '100%',
  //   paddingVertical: 10,
  // },
});

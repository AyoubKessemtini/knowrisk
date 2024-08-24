import { Colors } from '@constants/Colors';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { I18nKeyPath } from 'src/i18n/types';
import { SegmentItem } from './SegmentItem';

export type SegmentType = 'overview' | 'Sleep' | 'Recovery' | 'Strain';

interface SegmentData {
  key: SegmentType;
  label: I18nKeyPath;
  textOption?: string;
}

interface SegmentProps {
  currentSegment: SegmentType;
  onSegmentPress: (segmentType: SegmentType) => void;
}

export const Segment = ({ currentSegment, onSegmentPress }: SegmentProps) => {
  const SEGMENTS: SegmentData[] = [
    { key: 'overview', label: 'segment.overview' },
    { key: 'Sleep', label: 'segment.sleep' },
    { key: 'Recovery', label: 'segment.recovery' },
    { key: 'Strain', label: 'segment.strain' },
  ];

  const [buttonWidths, setButtonWidths] = useState<number[]>(
    new Array(SEGMENTS.length).fill(null),
  );

  const underlineLeft = useSharedValue(0);
  const underlineWidth = useSharedValue(0);

  const animatedUnderlineStyle = useAnimatedStyle(() => {
    return {
      left: underlineLeft.value,
      width: underlineWidth.value,
    };
  });

  const onSegmentControllerPress = (key: SegmentType, index: number) => {
    onSegmentPress(key);
    const leftWidth = buttonWidths
      .slice(0, index)
      .reduce((acc, width) => acc + (width || 0), 0);

    underlineLeft.value = withTiming(leftWidth, { duration: 300 });
    underlineWidth.value = withTiming(buttonWidths[index], {
      duration: 300,
    });
  };

  const handleLayoutChange = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    if (buttonWidths[index] !== width) {
      const allWidths = [...buttonWidths];
      allWidths[index] = width;
      setButtonWidths(allWidths);
    }
  };

  useEffect(() => {
    const index = SEGMENTS.findIndex((seg) => seg.key === currentSegment);
    if (index > -1 && buttonWidths[index] !== null) {
      underlineLeft.value = buttonWidths
        .slice(0, index)
        .reduce((acc, width) => acc + (width || 0), 0);
      underlineWidth.value = buttonWidths[index];
    }
  }, [buttonWidths]);

  return (
    <View style={styles.container}>
      {SEGMENTS.map(({ key, label }, index) => (
        <SegmentItem
          key={index}
          onLayout={(event) => handleLayoutChange(event, index)}
          text={label}
          isSelected={currentSegment === key}
          onSegmentPress={() => onSegmentControllerPress(key, index)}
        />
      ))}
      <Animated.View style={[styles.underline, animatedUnderlineStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    borderColor: Colors.backgroundWhite,
    // backgroundColor: Colors.white,
  },
  underline: {
    position: 'absolute',
    bottom: -3,
    height: 3,
    borderRadius: 24,
    backgroundColor: Colors.black,
  },
});

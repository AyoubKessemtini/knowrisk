import { Colors } from '@constants/Colors';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

interface ToggleProps {
  activated: boolean;
  onPressHandler: () => void;
  size?: number;
}

export const Toggle = ({
  activated,
  onPressHandler,
  size = 32,
}: ToggleProps) => {
  const offBackground = Colors.primaryBlack;
  const onBackground = Colors.primaryWhite;
  const KNOB_SIZE = size * 0.8;

  const animatedSwitchKnob = useAnimatedStyle(() => {
    const [offsetLeft, offsetRight] = [
      4,
      4,
    ];

    const start = withTiming(activated ? '100%' : '0%');
    const marginStart = withTiming(
      activated ? -KNOB_SIZE - offsetRight : 0 + offsetLeft,
    );

    return { start, marginStart };
  }, [activated]);

  return (
    <Pressable accessibilityRole="togglebutton" onPress={onPressHandler}>
      <View
        style={[
          styles.container,
          { backgroundColor: offBackground, height: size, width: size * 1.8 },
        ]}
      >
        <Animated.View
          style={[
            styles.inner,
            { backgroundColor: onBackground },
            useAnimatedStyle(
              () => ({ opacity: withTiming(activated ? 1 : 0) }),
              [activated],
            ),
          ]}
        />
        <Animated.View
          style={[
            styles.toggle,
            animatedSwitchKnob,
            { width: KNOB_SIZE, height: KNOB_SIZE },
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden',
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 0,
  },
  inner: {
    borderColor: Colors.primaryBlack,
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'center',
    paddingStart: 4,
    paddingEnd: 4,
    width: '100%',
    height: '100%',
  },
  toggle: {
    borderRadius: 12,
    position: 'absolute',
    width: 26,
    height: 26,
    backgroundColor: Colors.white,
  },
});

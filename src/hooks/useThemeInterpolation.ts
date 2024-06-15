import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useCTheme } from './useCTheme';
import { useEffect } from 'react';

type InterpolateableStyles = 'color' | 'backgroundColor';

export const useThemeInterpolation = (
  lightColor: string,
  darkColor: string,
  styleToInterpolate: InterpolateableStyles = 'backgroundColor',
) => {
  const { isLightTheme } = useCTheme();
  const themeAnimation = useSharedValue(isLightTheme ? 0 : 1);

  const animatedStyle = useAnimatedStyle(() => {
    const interpolatedColor = interpolateColor(
      themeAnimation.value,
      [0, 1],
      [lightColor, darkColor],
    );

    if (styleToInterpolate === 'color') {
      return { color: interpolatedColor };
    } else {
      return { backgroundColor: interpolatedColor };
    }
  });

  useEffect(() => {
    themeAnimation.value = withTiming(isLightTheme ? 0 : 1, { duration: 250 });
  }, [isLightTheme]);

  return { animatedStyle };
};

import { Colors } from '@constants/Colors';
import { useThemeInterpolation } from '@hooks/useThemeInterpolation';
import lang from 'i18n-js';
import React, { useMemo } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { I18nKeyPath } from 'src/i18n/types';
import { CText, TextColors, TextSizes } from '../CText';

type PRH<T extends string, K> = Partial<Record<T, K>> | undefined;
type ButtonTypes = keyof typeof $buttonTypesColors.light;

interface CustomButtonProps extends PressableProps {
  text: I18nKeyPath;
  textOptions?: lang.TranslateOptions;
  buttonType?: ButtonTypes;
  mb?: number;
  mt?: number;
  style?: StyleProp<ViewStyle>;
  rightAccessory?: JSX.Element; // Added rightAccessory prop
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CButton = ({
  text,
  textOptions,
  buttonType = 'primary',
  mb,
  mt,
  style,
  rightAccessory, // Added rightAccessory here
  ...pressableProps
}: CustomButtonProps): JSX.Element => {
  const { animatedStyle } = useThemeInterpolation(
    $buttonTypesColors.light[buttonType],
    $buttonTypesColors.dark[buttonType],
  );

  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withSpring(0.65, { duration: 150 });
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1, { duration: 250 });
  };

  const containerStyles = useMemo(() => {
    return [
      styles.container,
      animatedStyle,
      !!mb && { marginBottom: mb },
      !!mt && { marginTop: mt },
      style,
      { opacity },
    ];
  }, [animatedStyle, mb, mt, style, opacity]);

  const buttonStyles = [
    styles.baseButton,
    !!pressableProps.disabled && styles.disabledButton,
    buttonsTypesStyles?.[buttonType] ?? {},
  ];

  return (
    <Animated.View style={containerStyles}>
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        {...pressableProps}
        style={buttonStyles}
      >
        <CText
          isCentered
          size={$textsData[buttonType].size}
          text={text}
          color={$textsData[buttonType].color}
          style={styles.baseText}
          textOptions={textOptions}
        />
        {rightAccessory && (
          <View style={styles.rightAccessory}>{rightAccessory}</View>
        )}
      </AnimatedPressable>
    </Animated.View>
  );
};

const $buttonTypesColors = {
  ...Colors.buttons,
};

const $textsData: Record<ButtonTypes, { color: TextColors; size: TextSizes }> =
  {
    primary: {
      color: 'white',
      size: 'md_bold',
    },
    danger: {
      color: 'black',
      size: 'lg_bold',
    },
    secondary: {
      color: 'white',
      size: 'md_medium',
    },
    success: {
      color: 'white',
      size: 'sm',
    },
  };

const styles = StyleSheet.create({
  container: { width: '100%', borderRadius: 16 },
  baseButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 64,
    padding: 16,
    borderRadius: 6,
    overflow: 'hidden',
  },
  baseText: {
    flexShrink: 1,
    flexGrow: 0,
    textAlign: 'center',
    zIndex: 10,
  },
  rightAccessory: {
    marginLeft: 8, // Adjust the margin for spacing between text and accessory
  },
  disabledButton: {
    opacity: 0.4,
  },
});

/* eslint-disable react-native/no-unused-styles */
const buttonsTypesStyles: PRH<ButtonTypes, ViewStyle> = StyleSheet.create({
  danger: { height: 80 },
});

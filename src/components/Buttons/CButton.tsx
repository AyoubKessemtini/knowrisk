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
  textSize?: TextSizes;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Custom Button Component (`CButton`)
 *
 * @param {I18nKeyPath} [props.text] - The internationalization key path to the button text to display.
 * @param {lang.TranslateOptions} [props.textOptions] - Options for the translation function.
 * @param {ButtonTypes} [props.buttonType='primary'] - The type of the button.
 * @param {number} [props.mb] - The margin-bottom of the button component.
 * @param {number} [props.mt] - The margin-top of the button component.
 *
 * @example
 * // To use the `CButton` component:
 * <CButton
 *   text="common.continue"
 *   buttonType="danger"
 *   mb={10}
 *   onPress=(() => null)
 * />
 */
export const CButton = ({
  text,
  textOptions,
  buttonType = 'primary',
  mb,
  mt,
  style,
  textSize = 'md_bold',
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
          size={textSize}
          text={text}
          color={$textsData[buttonType].color}
          style={styles.baseText}
          textOptions={textOptions}
        />
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
    minHeight: 48,
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
  disabledButton: {
    opacity: 0.4,
  },
});

/* Extra buttons styles like border widths, border radius, heights that do not follow baseButton style */
/* eslint-disable react-native/no-unused-styles */
const buttonsTypesStyles: PRH<ButtonTypes, ViewStyle> = StyleSheet.create({
  danger: { height: 80 },
});

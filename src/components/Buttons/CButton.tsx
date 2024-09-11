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
  textSize?: TextSizes;
  rightAccessory?: JSX.Element;
  leftAccessory?: JSX.Element;
  buttonVersion?: 1 | 2 | 3;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CButton = ({
  text,
  textOptions,
  buttonType = 'primary',
  mb,
  mt,
  style,
  textSize = 'md_bold',
  rightAccessory,
  leftAccessory,
  buttonVersion = 1,
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
      buttonVersion === 2 && styles.version2Container,
      buttonVersion === 3 && styles.version3Container,
    ];
  }, [animatedStyle, mb, mt, style, opacity, buttonVersion]);

  const buttonStyles = [
    styles.baseButton,
    !!pressableProps.disabled && styles.disabledButton,
    buttonsTypesStyles?.[buttonType] ?? {},
    buttonVersion === 2 && styles.version2Button,
    buttonVersion === 3 && styles.version3Button,
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
        {leftAccessory && (
          <View style={styles.leftAccessory}>{leftAccessory}</View>
        )}
        <CText
          isCentered={buttonVersion === 1}
          size={
            buttonVersion === 3
              ? 'lg_medium'
              : buttonVersion === 2
                ? 'md_medium'
                : textSize
          }
          text={text}
          color={$textsData[buttonType].color}
          style={[
            styles.baseText,
            buttonVersion === 2 && styles.version2Text,
            buttonVersion === 3 && styles.version3Text,
          ]}
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
    magnolia: {
      color: 'magnolia',
      size: 'md_medium',
    },
    cosmos: {
      color: 'cosmos',
      size: 'lg_medium',
    },
    brick: {
      color: 'brick',
      size: 'md_medium',
    },
    fog: {
      color: 'fog',
      size: 'md_medium',
    },
    purple: {
      color: 'purple',
      size: 'md_medium',
    },
  };

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
  },
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
  rightAccessory: {
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.4,
  },
  version2Container: {
    width: '100%',
    minHeight: 51,
    borderRadius: 5,
  },
  version2Button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 51,
    padding: 12,
  },
  version2Text: {
    marginLeft: 5,
    color: Colors.purple,
  },
  version3Container: {
    width: '100%',
    minHeight: 61,
    borderRadius: 8,
  },
  version3Button: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 16,
  },
  version3Text: {
    color: Colors.brick,
  },
  leftAccessory: {
    marginRight: 8,
  },
});

/* eslint-disable react-native/no-unused-styles */
const buttonsTypesStyles: PRH<ButtonTypes, ViewStyle> = StyleSheet.create({
  danger: { height: 80 },
});

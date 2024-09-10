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
import Icon from 'react-native-easy-icon';

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
  buttonVersion?: 1 | 2 | 3 | 4;
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
      buttonVersion === 3 && styles.version3Container,
      buttonVersion === 4 && styles.version4Container,
    ];
  }, [animatedStyle, mb, mt, style, opacity, buttonVersion]);

  const buttonStyles = [
    styles.baseButton,
    !!pressableProps.disabled && styles.disabledButton,
    buttonsTypesStyles?.[buttonType] ?? {},
    buttonVersion === 2 && styles.version2Button,
    buttonVersion === 3 && styles.version3Button,
    buttonVersion === 4 && styles.version4Button,
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
        {buttonVersion === 4 && (
          <View style={styles.version4TextContainer}>
            {/* Two stacked texts */}
            <CText
              text="common.apply"
              size="md_medium"
              color="purple"
              style={styles.version4Text}
              textOptions={textOptions}
            />
            <CText
              text="common.apply"
              size="sm"
              color="purple"
              style={styles.version4Text}
              textOptions={textOptions}
            />
          </View>
        )}
        {buttonVersion === 4 && (
          <Icon
            type="material"
            name="questioncircleo"
            size={21}
            color="purple"
            style={styles.icon}
          />
        )}
        {buttonVersion === 3 && (
          <Icon
            type="material"
            name="logout"
            size={21}
            color={Colors.brick}
            style={styles.icon}
          />
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
        {rightAccessory && buttonVersion === 1 && (
          <View style={styles.rightAccessory}>{rightAccessory}</View>
        )}
        {buttonVersion === 2 && (
          <Icon
            type="material"
            name="chevron-right"
            size={21}
            color={Colors.fog}
            style={styles.icon}
          />
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
      size: 'md_medium',
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
  version2Button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 51,
    padding: 12,
    backgroundColor: Colors.magnolia,
  },
  version2Text: {
    textAlign: 'left',
    marginLeft: 5,
    color: Colors.purple,
  },
  icon: {
    marginLeft: 0,
  },

  version3Container: {
    width: '100%',
    minHeight: 61,
    backgroundColor: Colors.cosmos,
    borderRadius: 12,
  },
  version3Button: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 16,
  },
  version3Text: {
    fontSize: 18,
    color: Colors.brick,
    marginLeft: 10,
  },

  version4Container: {
    width: '100%',
    minHeight: 48,
    backgroundColor: Colors.magnolia,
    borderRadius: 6,
  },
  version4Button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  version4TextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  version4Text: {
    textAlign: 'left',
    marginLeft: 5,
    color: Colors.purple,
  },
});

/* eslint-disable react-native/no-unused-styles */
const buttonsTypesStyles: PRH<ButtonTypes, ViewStyle> = StyleSheet.create({
  danger: { height: 80 },
});

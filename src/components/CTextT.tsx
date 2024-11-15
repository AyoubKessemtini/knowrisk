import React, { useMemo } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors } from '@constants/Colors';
import { useThemeInterpolation } from '@hooks/useThemeInterpolation';
import { RootState, useAppSelector } from '@store/index';
import { t } from 'src/i18n/i18n';
import { I18nKeyPath } from 'src/i18n/types';

type WeightKeys = keyof typeof weightStyles;
type StylesKeys = Exclude<keyof typeof styles, 'base'>;
export type TextSizes = StylesKeys | `${StylesKeys}_${WeightKeys}`;
export type TextColors = keyof (typeof Colors)['texts']['light'];

export interface CustomTextProps extends TextProps {
  text?: I18nKeyPath;
  size?: TextSizes;
  color?: TextColors;
  textOptions?: lang.TranslateOptions;
  isCentered?: boolean;
  isActive?: boolean;
  mb?: number;
  mt?: number;
  flexed?: boolean;
}

export const CTextT = ({
  size = 'sm_medium',
  text,
  textOptions,
  isCentered,
  isActive,
  color = 'black',
  mb,
  mt,
  flexed,
  ...textProps
}: CustomTextProps): JSX.Element => {
  const { selectedLocale } = useAppSelector((state: RootState) => state.locale);
  const { animatedStyle } = useThemeInterpolation(
    Colors.texts.light[color],
    Colors.texts.dark[color],
    'color',
  );

  // Translate the text prop using `t` with a default fallback
  const tText = useMemo(() => (text ? t(text, textOptions) : ''), [text, textOptions, selectedLocale]);
  const content = tText || textProps.children || '';

  // Extract font size and weight from the `size` prop
  const weights = 'bold|medium|italic|semiBold|light';
  const weightRegex = new RegExp(`(${weights})$`);
  const weightMatch = size.match(weightRegex)?.[1] as WeightKeys | undefined;

  const fontSize = (
    weightMatch ? size.replace(`_${weightMatch}`, '') : size
  ) as StylesKeys;
  const fontWeight = weightMatch ? weightStyles[weightMatch] : null;

  // Create the generated styles for the component
  const generatedStyles = useMemo(
    () => [
      styles.base,
      styles[fontSize],
      fontWeight,
      animatedStyle,
      mb && { marginBottom: mb },
      mt && { marginTop: mt },
      flexed && positionStyles.flexed,
      isCentered && positionStyles.centered,
      textProps.style,
      isActive && activeStyles.black,
    ],
    [
      fontSize,
      fontWeight,
      isActive,
      isCentered,
      textProps.style,
      mb,
      mt,
      flexed,
      animatedStyle,
    ],
  );

  return (
    <Animated.Text {...textProps} style={generatedStyles}>
      {content}
    </Animated.Text>
  );
};

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  base: { fontFamily: 'Poppins Regular' },
  xs: { fontSize: 10 },
  xm: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 24 },
  xxl: { fontSize: 28 },
  xxxl: { fontSize: 32 },
});

const weightStyles = StyleSheet.create({
  bold: { fontFamily: 'Poppins Bold' },
  semiBold: { fontFamily: 'Poppins SemiBold' },
  medium: { fontFamily: 'Poppins Regular' },
  italic: { fontFamily: 'GoogleSans-Italic' },
  light: { fontFamily: 'Poppins Light' },
});

const positionStyles = StyleSheet.create({
  centered: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexed: {
    flex: 1,
  },
});

const activeStyles = StyleSheet.create({
  black: {
    color: Colors.black,
  },
});

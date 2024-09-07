import { Colors } from '@constants/Colors';
import { useThemeInterpolation } from '@hooks/useThemeInterpolation';
import { useAppSelector } from '@store/index';
import lang from 'i18n-js';
import React, { useMemo } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import Animated from 'react-native-reanimated';
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

/**
 * Custom Text Component (`CText`)
 *
 * @param {I18nKeyPath} [props.text] - The internationalization key path or the text string to display.
 * @param {lang.TranslateOptions} [props.textOptions] - Options for the translation function.
 * @param {TextSizes} [props.size='sm_medium'] - The size and weight of the text.
 * xs=12, sm=14, md=16, lg=18, xl=20
 * @param {number} [props.mb] - The margin-bottom of the text component.
 * @param {number} [props.mt] - The margin-top of the text component.
 *
 * @example
 * // To use the `CText` component:
 * <CText
 *   text="hello_world"
 *   size="lg_bold"
 *   color="white"
 *   isCentered
 *   mb={10}
 * />
 */
export const CText = ({
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
  const { selectedLocale } = useAppSelector((state) => state.locale);
  const { animatedStyle } = useThemeInterpolation(
    Colors.texts.light[color],
    Colors.texts.dark[color],
    'color',
  );

  const tText = useMemo(
    () => text && t(text, textOptions),
    [text, textOptions, selectedLocale],
  );
  const content = tText || textProps.children;

  const weights = 'bold|medium|italic';
  const weightRegex = new RegExp(`(${weights})$`);
  const weightMatch = size.match(weightRegex)?.[1] as WeightKeys | undefined;

  const fontSize = (
    weightMatch ? size.replace(`_${weightMatch}`, '') : size
  ) as StylesKeys;

  const fontWeight = weightMatch ? weightStyles[weightMatch] : null;

  const generatedStyles = useMemo(
    () => [
      styles.base,
      styles[fontSize],
      fontWeight,
      animatedStyle,
      !!mb && { marginBottom: mb },
      !!mt && { marginTop: mt },
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
  base: { fontFamily: 'GoogleSans-Regular' },

  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 24 },
  xxl: { fontSize: 28 },
});

const weightStyles = StyleSheet.create({
  bold: { fontFamily: 'Poppins Bold' },
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

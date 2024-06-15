import { Colors } from '@constants/Colors';
import { TestIDs } from '@constants/TestIDs';
import React, { ComponentType, useMemo, useRef } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { t } from 'src/i18n/i18n';
import { I18nKeyPath } from 'src/i18n/types';
import { CText } from './CText';

type TextInputStatuses = 'disabled' | 'error';

type StylesContainersProps = {
  pressableStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

type BottomTextProps = {
  bottomText?: I18nKeyPath;
  bottomTextColor?: string;
};

type RightAccessoryProps = {
  state?: TextInputStatuses;
};

export type CustomTextInputProps = {
  state?: TextInputStatuses;
  placeholderText?: I18nKeyPath;
  placeholderColor?: string;
  labelText?: I18nKeyPath;
  textSize?: number;

  RightAccessory?: ComponentType<RightAccessoryProps>;
} & Omit<TextInputProps, 'placeholder'> &
  StylesContainersProps &
  BottomTextProps;

export const CTextInput = ({
  state,
  labelText,
  placeholderText,
  placeholderColor,
  pressableStyle,
  inputWrapperStyle,
  textStyle,
  RightAccessory,
  bottomText,
  bottomTextColor = Colors.deepRed,
  ...textInputProps
}: CustomTextInputProps) => {
  const input = useRef<TextInput>(null);

  const disabled = textInputProps.editable === false || state === 'disabled';
  const placeholder = placeholderText && t(placeholderText);

  const focusTextInput = () => {
    if (disabled) return;
    input.current?.focus();
  };

  const generateInputWrapperStyle = useMemo(
    () => [
      styles.inputWrapper,
      state === 'error' && { borderColor: Colors.deepRed },
      inputWrapperStyle,
    ],
    [inputWrapperStyle, state],
  );

  const generateInpuStyle = useMemo(
    () => [
      styles.input,
      styles.text,
      state === 'error' && styles.invalidText,
      disabled && { color: Colors.primaryBlack },
      textStyle && textStyle,
    ],
    [disabled, state, textStyle],
  );

  return (
    <View>
      {!!labelText && (
        <CText text={labelText} size="xs_medium" style={styles.labelText} />
      )}

      <Pressable
        accessibilityState={{ disabled }}
        accessibilityRole="button"
        onPress={focusTextInput}
        style={pressableStyle}
      >
        <View style={generateInputWrapperStyle}>
          <TextInput
            ref={input}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor || Colors.backgroundWhite}
            textAlignVertical="center"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            {...textInputProps}
            editable={!disabled}
            style={generateInpuStyle}
          />
          {!!RightAccessory && <RightAccessory state={state} />}
        </View>
        {bottomText && state === 'error' && (
          <CText
            testID={TestIDs.tests.CTextInputBottomText}
            size="sm_italic"
            text={bottomText}
            style={[styles.bottomText, { color: bottomTextColor }]}
          />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: Colors.textInput.light.main,
    borderColor: Colors.primaryBlack,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingRight: 16,
    paddingLeft: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignSelf: 'stretch',
  },
  text: {
    color: Colors.black1,
    fontFamily: 'GoogleSans-Bold',
    fontSize: 20,
  },
  invalidText: { color: Colors.deepRed },
  bottomText: { textAlign: 'center', marginTop: 14 },
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginBottom: 12,
    color: Colors.primaryBlack,
  },
});

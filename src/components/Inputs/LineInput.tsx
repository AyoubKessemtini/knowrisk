import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CustomTextInputProps as CInputProps } from '../CTextInput';

interface LineInputProps<TFieldValues extends FieldValues = FieldValues>
  extends CInputProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
}

export const LineInput = <TFieldValues extends FieldValues>({
  control,
  name,
  ...textInputProps
}: LineInputProps<TFieldValues>) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { invalid },
        }) => (
          <TextInput
            placeholderTextColor={Colors.fadedPurple}
            style={styles.input}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            state={invalid ? 'error' : undefined}
            {...textInputProps}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    color: Colors.deepPurple,
    height: 40,
    borderBottomWidth: 1,
    borderColor: Colors.fadedPurple,
    fontSize: 18,
  },
});
export default LineInput;

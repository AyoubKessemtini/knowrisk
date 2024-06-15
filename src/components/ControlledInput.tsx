import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { CTextInput, CustomTextInputProps as CInputProps } from './CTextInput';

interface ControlledInputProps<TFieldValues extends FieldValues = FieldValues>
  extends CInputProps {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
}

export const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  ...textInputProps
}: ControlledInputProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid },
      }) => (
        <CTextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          state={invalid ? 'error' : undefined}
          {...textInputProps}
        />
      )}
    />
  );
};

import { Colors } from '@constants/Colors';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-easy-icon';
import { Control, FieldValues, Path } from 'react-hook-form';
import { ControlledInput } from '@components/ControlledInput';

interface PassTextInputProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export const PassTextInput = <TFieldValues extends FieldValues>({
  control,
  name,
}: PassTextInputProps<TFieldValues>) => {
  const [isSecureEnabled, setIsSecuredEnabled] = useState(true);

  return (
    <ControlledInput
      secureTextEntry={isSecureEnabled}
      placeholderText="common.pass"
      placeholderColor="grey2"
      textStyle={{ color: Colors.deepPurple }}
      control={control}
      name={name}
      //   LeftAccessory={({ state }: { state: string }) => (
      //     <Icon
      //       type="simple-line-icon"
      //       name="lock"
      //       size={24}
      //       color={state === 'focused' ? Colors.deepPurple : Colors.orange}
      //     />
      //   )}
      backgroundColor={Colors.lightPink}
      RightAccessory={() => (
        <Pressable onPress={() => setIsSecuredEnabled(!isSecureEnabled)}>
          <Icon
            type="ionicon"
            name={isSecureEnabled ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color={Colors.blue}
          />
        </Pressable>
      )}
    />
  );
};

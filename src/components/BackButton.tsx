import { Colors } from '@constants/Colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-easy-icon';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
export const BackButton = () => {
  const navigation = useNavigation();
  const goBack = () => {
    ReactNativeHapticFeedback.trigger(HapticFeedbackTypes.soft);
    navigation.goBack();
  };

  return (
    <Pressable onPress={goBack}>
      <Icon type="feather" name="chevron-left" size={35} color={Colors.black} />
    </Pressable>
  );
};

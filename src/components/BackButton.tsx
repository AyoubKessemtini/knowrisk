import { Colors } from '@constants/Colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import ImageAssets from '@assets/images';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import { CImage } from './CImage';
export const BackButton = () => {
  const navigation = useNavigation();
  const goBack = () => {
    ReactNativeHapticFeedback.trigger(HapticFeedbackTypes.soft);
    navigation.goBack();
  };

  return (
    <Pressable onPress={goBack} style={styles.pressableStyle}>
      <CImage source={ImageAssets.LEFT_ARROW} height={16} width={16} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableStyle: {
    backgroundColor: Colors.deepPurple,
    padding: 9,
    borderRadius: 12,
  },
});

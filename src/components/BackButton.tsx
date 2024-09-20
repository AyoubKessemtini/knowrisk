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
      <CImage source={ImageAssets.LEFT_ARROW} height={13} width={13} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableStyle: {
    backgroundColor: Colors.deepPurple,
    padding: 7,
    borderRadius: 10,
  },
});

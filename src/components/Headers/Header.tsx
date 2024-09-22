import React from 'react';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { Colors } from '@constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CText } from '@components/CText';
import { useNavigation } from '@react-navigation/native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import { BackButton } from '@components/BackButton';
import { I18nKeyPath } from 'src/i18n/types';

type TextColor = keyof typeof Colors.texts.light;
interface HeaderProps {
  hasBackButton?: boolean;
  useCustomBackButton?: boolean;
  hasRightAccessory?: boolean;
  onRightAccessoryPress?: () => void;
  text?: I18nKeyPath;
  currentStep?: number;
  totalSteps?: number;
  backgroundColor?: string;
  textColor?: TextColor;
}

export const Header = ({
  hasBackButton = false,
  useCustomBackButton = false,
  hasRightAccessory = false,
  onRightAccessoryPress,
  text,
  currentStep,
  totalSteps,
  backgroundColor = Colors.white,
  textColor = 'purple',
}: HeaderProps) => {
  const navigation = useNavigation();

  const goBack = () => {
    ReactNativeHapticFeedback.trigger(HapticFeedbackTypes.soft);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {hasBackButton &&
        (useCustomBackButton ? (
          <BackButton />
        ) : (
          <Pressable onPress={goBack}>
            <Ionicons name="chevron-back" size={21} color={Colors.purple2} />
          </Pressable>
        ))}

      {text && (
        <View style={styles.textContainer}>
          <CText size="lg_medium" color={textColor} text={text} />
        </View>
      )}

      {currentStep && totalSteps && (
        <View style={styles.stepContainer}>
          <CText size="md_medium" color="deepPurple">
            {currentStep}/{totalSteps}
          </CText>
        </View>
      )}

      {hasRightAccessory && (
        <Pressable onPress={onRightAccessoryPress}>
          <Ionicons name="close" size={21} color={Colors.purple1} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    ...Platform.select({
      ios: {
        paddingVertical: 15,
        paddingHorizontal: 20,
      },
      android: {
        paddingVertical: 20,
        paddingHorizontal: 20,
      },
    }),
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

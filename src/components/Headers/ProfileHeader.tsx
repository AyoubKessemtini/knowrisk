import React from 'react';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import { Colors } from '@constants/Colors';
import { I18nKeyPath } from 'src/i18n/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CText } from '@components/CText';
import { useNavigation } from '@react-navigation/native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

interface ProfileHeaderProps {
  hasBackButton?: boolean;
  text?: I18nKeyPath;
  backgroundColor?: string;
}

export const ProfileHeaderBackButton = () => {
  const navigation = useNavigation();
  const goBack = () => {
    ReactNativeHapticFeedback.trigger(HapticFeedbackTypes.soft);
    navigation.goBack();
  };
  return (
    <Pressable onPress={goBack}>
      <Ionicons name="chevron-back" size={21} color={Colors.purple2} />
    </Pressable>
  );
};

export const ProfileHeader = ({
  hasBackButton = false,
  text,
  backgroundColor = Colors.white,
}: ProfileHeaderProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {hasBackButton && <ProfileHeaderBackButton />}

      <View style={styles.textContainer}>
        {text && <CText size="lg_medium" color="purple" text={text} />}
      </View>
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
        paddingHorizontal: 15,
      },
      android: {
        paddingVertical: 15,
        paddingHorizontal: 15,
      },
    }),
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

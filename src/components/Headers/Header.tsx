import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/Colors';
import { I18nKeyPath } from 'src/i18n/types';
import { BackButton } from '@components/BackButton';
import { CText } from '@components/CText';

interface HeaderProps {
  hasBackButton?: boolean;
  text?: I18nKeyPath;
  currentStep?: number;
  totalSteps?: number;
}

export const Header = ({
  hasBackButton = false,
  text,
  currentStep,
  totalSteps,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {hasBackButton && <BackButton />}

      {text && <CText size="lg_medium" color="deepPurple" text={text} />}
      <View style={styles.rightContainer}>
        {currentStep && totalSteps && (
          <CText size="md_medium" color="deepPurple">
            {currentStep}/{totalSteps}
          </CText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingTop: 40,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      android: {
        paddingVertical: 20,
        paddingHorizontal: 20,
      },
    }),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

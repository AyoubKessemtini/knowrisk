import React from 'react';
import { StyleSheet } from 'react-native';
import { Screen } from '@components/Screen';

export const SleepScreen: React.FC = () => {
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    ></Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});

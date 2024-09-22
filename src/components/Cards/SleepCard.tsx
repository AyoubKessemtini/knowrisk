import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { I18nKeyPath } from 'src/i18n/types';

type SleepCardProps = {
  sleepData: string;
  unit: string;
  lastUpdated: string;
  title: I18nKeyPath;
};

export const SleepCard = ({
  sleepData,
  unit,
  title,
  lastUpdated,
}: SleepCardProps) => {
  return (
    <View style={styles.container}>
      <CText
        mb={10}
        size="sm_semiBold"
        color="black"
        text={title as I18nKeyPath}
      />

      <View style={styles.row}>
        <CText color="deepPurple" size="xxxl_bold">
          {sleepData ? sleepData : ''}
        </CText>

        <CText size="sm_light" color="grey3">
          {unit}
        </CText>
      </View>

      <CText
        size="xs"
        color="grey4"
        text="home_screen.last_updated"
        textOptions={{ date: lastUpdated }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.lightPurple,
    padding: 10,
    borderRadius: 16,
    width: '49%',
    justifyContent: 'space-between',
    minHeight: 150,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

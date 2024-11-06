import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { I18nKeyPath } from 'src/i18n/types';

type SleepCardProps = {
  sleepData: string;
  unit?: string;
  lastUpdated: string;
  title: I18nKeyPath;
  onPress?: void;
};

export const SleepCard = ({
  sleepData,
  unit,
  title,
  lastUpdated,
  onPress,
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
        <CText color="deepPurple" size="xl_bold">
          {sleepData ? sleepData : ''}
        </CText>

        <CText mt={3} size="sm_light" color="grey3">
          {unit}
        </CText>
      </View>

      {onPress && (
        <TouchableOpacity onPress={onPress}>
        <CText
            size="xs"
            color="grey4"
        >
         Click for details
        </CText>
        </TouchableOpacity>
      )}
      {!onPress && (
          <CText
              size="xs"
              color="grey4"
              text="home_screen.last_updated"
              textOptions={{ date: lastUpdated }}
          />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.lightPurple,
    padding: 7,
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

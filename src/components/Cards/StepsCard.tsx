import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';

type StepsCardProps = {
  steps: number | string;
  lastUpdated: string;
};

export const StepsCard = ({ steps, lastUpdated }: StepsCardProps) => {
  return (
    <View style={styles.container}>
      <CText
        mb={10}
        size="sm_semiBold"
        color="black"
        text="home_screen.steps"
      />

      <View style={styles.row}>
        <CText color="deepPurple" size="lg_semiBold">
          {steps ? steps : 0}
        </CText>
        <CText text="home_screen.steps" size="sm_light" color="grey3" />
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
    padding: 7,
    borderRadius: 16,
    width: '49%',
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

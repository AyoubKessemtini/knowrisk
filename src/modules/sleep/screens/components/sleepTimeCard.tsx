import React from 'react';
import { View, StyleSheet } from 'react-native';
import { pallete, PalleteColors } from '@constants/Colors';
import { CText } from '@components/CText.tsx';

interface SleepTimeCardProps {
  title?: string;
  time?: string;
  color?: PalleteColors;
}

export const SleepTimeCard: React.FC<SleepTimeCardProps> = ({
  title,
  time,
  color = 'white',
}) => {
  const backgroundColor = pallete[color];
  return (
    <View style={[styles.noteContainer, { backgroundColor }]}>
      <View style={styles.noteContent}>
        <CText mb={8} size="md" color={'grey3'}>
          {title}
        </CText>
        <CText size="md_semiBold" color="deepPurple">
          {time}
        </CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  noteContent: {
    flexDirection: 'column',
  },
});

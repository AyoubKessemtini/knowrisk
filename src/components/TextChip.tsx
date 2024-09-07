import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CText, TextColors, TextSizes } from '@components/CText';

interface TextChipProps {
  text: string;
  backgroundColor: string;
  isCentred?: boolean;
  textColor: TextColors;
  textSize?: TextSizes;
  paddingVertical?: number;
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
}

const TextChip = ({
  text,
  backgroundColor,
  textColor,
  textSize = 'sm_medium',
  isCentred = true,
  paddingVertical = 5,
  leftAccessory,
  rightAccessory,
}: TextChipProps) => {
  return (
    <View
      style={[
        styles.chipContainer,
        {
          backgroundColor: backgroundColor,
          paddingVertical: paddingVertical,
        },
        isCentred ? styles.centered : styles.notCentered,
      ]}
    >
      {leftAccessory && <View style={styles.accessory}>{leftAccessory}</View>}
      <CText size={textSize} color={textColor} numberOfLines={1}>
        {text}
      </CText>
      {rightAccessory && <View style={styles.accessory}>{rightAccessory}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 10,
  },
  centered: {
    alignSelf: 'center',
  },
  notCentered: {
    alignSelf: 'flex-start',
  },
  accessory: {
    marginHorizontal: 5,
  },
});

export default TextChip;

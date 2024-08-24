import { CText } from '@components/CText';
import React from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet } from 'react-native';
import { I18nKeyPath } from 'src/i18n/types';

interface SegmentItemProps {
  text: I18nKeyPath;
  isSelected: boolean;
  onSegmentPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
}

export const SegmentItem = ({
  isSelected,
  text,
  onSegmentPress,
  onLayout,
}: SegmentItemProps) => {
  return (
    <Pressable
      onLayout={onLayout}
      style={styles.button}
      onPress={onSegmentPress}
    >
      <CText
        isCentered
        color={isSelected ? 'black' : 'black'}
        text={text}
        size={isSelected ? 'sm_bold' : 'sm_medium'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: { paddingTop: 32, paddingBottom: 16, flexGrow: 1 },
});

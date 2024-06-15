import { Colors } from '@constants/Colors';
import React, { useMemo } from 'react';
import { View } from 'react-native';

interface SeperatorProps {
  size: number | `${number}%`;
  color?: string;
  depth?: number;
  direction?: 'horizontal' | 'vertical';
}

export const Separator = ({
  color = Colors.primaryBlack,
  direction = 'horizontal',
  depth = 1,
  size,
}: SeperatorProps) => {
  const seperatorStyle = useMemo(
    () => ({
      backgroundColor: color,
      ...(direction === 'vertical'
        ? { height: size, width: depth }
        : { width: size, height: depth }),
    }),
    [color, direction, depth, size],
  );
  return <View testID="separator" style={seperatorStyle} />;
};

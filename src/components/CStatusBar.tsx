import { useCTheme } from '@hooks/useCTheme';
import React from 'react';
import { StatusBar } from 'react-native';

export const CStatusBar = () => {
  const { isLightTheme } = useCTheme();

  return (
    <StatusBar barStyle={isLightTheme ? 'dark-content' : 'light-content'} />
  );
};

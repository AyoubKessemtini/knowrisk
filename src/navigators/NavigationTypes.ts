import { NavigationContainer } from '@react-navigation/native';
import { ComponentProps } from 'react';

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

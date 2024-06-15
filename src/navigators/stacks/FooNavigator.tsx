import { BooScreen } from '@modules/home/screens/BooScreen';
import { FooScreen } from '@modules/home/screens/FooScreen';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import { FooStackRoutes } from '../routes';
import { navigatorConfig } from '../navigatorConfigs';

export type FooStackParamList = {
  [FooStackRoutes.FOO_SCREEN]: undefined;
  [FooStackRoutes.BOO_SCREEN]: undefined;
};

export type FooStackScreenProps<T extends keyof FooStackParamList> =
  NativeStackScreenProps<FooStackParamList, T>;

const Stack = createNativeStackNavigator<FooStackParamList>();

export function FooNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...navigatorConfig,
      }}
    >
      <Stack.Screen name={FooStackRoutes.FOO_SCREEN} component={FooScreen} />
      <Stack.Screen name={FooStackRoutes.BOO_SCREEN} component={BooScreen} />
    </Stack.Navigator>
  );
}

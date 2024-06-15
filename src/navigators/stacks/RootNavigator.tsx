import { Colors } from '@constants/Colors';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { navigatorConfig } from '../navigatorConfigs';
import { RootStackRoutes } from '../routes';
import { FooNavigator, FooStackParamList } from './FooNavigator';
import { TabNavigator, TabStackParamList } from './TabNavigator';
import { useAuth } from '@hooks/useAuth';
/* import { useAppSelector } from '@store/index'; */

export type RootStackParamList = {
  [RootStackRoutes.TAB_STACK]: NavigatorScreenParams<TabStackParamList>;
  [RootStackRoutes.FOO_STACK]: NavigatorScreenParams<FooStackParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { login } = useAuth();
  //const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    login();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        ...navigatorConfig,
        navigationBarColor: Colors.deepRed,
      }}
    >
      <Stack.Screen name={RootStackRoutes.TAB_STACK} component={TabNavigator} />
      <Stack.Screen name={RootStackRoutes.FOO_STACK} component={FooNavigator} />
    </Stack.Navigator>
  );
}

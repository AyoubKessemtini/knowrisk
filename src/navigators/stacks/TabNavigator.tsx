import { Colors } from '@constants/Colors';
import { useThemeInterpolation } from '@hooks/useThemeInterpolation';
import { Home } from '@modules/home/screens/HomeScreen';
import { Profile } from '@modules/profile/screens/Profile';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-easy-icon';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tabConfig } from '../navigatorConfigs';
import { TabBarStackRoutes } from '../routes';
import { RootStackParamList, RootStackScreenProps } from './RootNavigator';

export type TabStackParamList = {
  [TabBarStackRoutes.HOME]: undefined;
  [TabBarStackRoutes.PROFILE]: undefined;
};

export type TabStackScreenProps<T extends keyof TabStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

const Tab = createBottomTabNavigator<TabStackParamList>();

export function TabNavigator() {
  const { bottom } = useSafeAreaInsets();
  const { animatedStyle } = useThemeInterpolation(
    Colors.black1,
    Colors.primaryBlack,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        ...tabConfig,
        tabBarStyle: {
          ...styles.tabBar,
          height: bottom + 56,
        },
        tabBarActiveTintColor: Colors.grey1,
        tabBarInactiveTintColor: Colors.grey2,
      }}
    >
      {Platform.OS === 'ios' && (
        <Tab.Screen
          name={TabBarStackRoutes.HOME}
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <Animated.View style={[animatedStyle, styles.tabIconContainer]}>
                <Icon type="antdesign" name="home" size={24} color={color} />
              </Animated.View>
            ),
          }}
        />
      )}
      <Tab.Screen
        name={TabBarStackRoutes.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Animated.View style={[animatedStyle, styles.tabIconContainer]}>
              <Icon type="antdesign" name="wallet" size={24} color={color} />
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingBottom: 0,
    borderTopWidth: 0,
  },
  tabIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

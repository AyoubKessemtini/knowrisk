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
import { Platform, StyleSheet, View } from 'react-native';
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
    Colors.white,
    Colors.primaryBlack,
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <Tab.Navigator
          screenOptions={{
            ...tabConfig,

            tabBarStyle: {
              ...styles.tabBar,
              height: bottom + 56,
              ...Platform.select({
                ios: {
                  shadowColor: Colors.black, // Shadow for iOS
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
                android: {
                  elevation: 5, // Shadow for Android
                },
              }),
            },
            tabBarActiveTintColor: Colors.deepPurple,
            tabBarInactiveTintColor: Colors.grey2,
          }}
        >
          {Platform.OS === 'ios' && (
            <Tab.Screen
              name={TabBarStackRoutes.HOME}
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <Animated.View
                    style={[animatedStyle, styles.tabIconContainer]}
                  >
                    <Icon
                      type="antdesign"
                      name="home"
                      size={24}
                      color={color}
                    />
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
                  <Icon
                    type="antdesign"
                    name="wallet"
                    size={24}
                    color={color}
                  />
                </Animated.View>
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
  },
  tabWrapper: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabBar: {
    paddingBottom: 0,
    borderTopWidth: 0,
    backgroundColor: Colors.white,
  },
  tabIconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

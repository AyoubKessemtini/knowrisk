import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Colors } from '@constants/Colors';
import { useThemeInterpolation } from '@hooks/useThemeInterpolation';
import { Home } from '@modules/home/screens/HomeScreen';
import { Profile } from '@modules/profile/screens/Profile';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-easy-icon';
import Animated from 'react-native-reanimated';
import { tabConfig } from '../navigatorConfigs';
import { RootStackRoutes, TabBarStackRoutes } from '../routes';
import { RootStackParamList, RootStackScreenProps } from './RootNavigator';
import { SleepScreen } from '@modules/sleep/screens/sleepScreen';
import { DeviceSettings } from '@modules/wearable/screens/DeviceSettings.tsx';

export type TabStackParamList = {
  [TabBarStackRoutes.HOME]: undefined;
  [TabBarStackRoutes.PROFILE]: undefined;
  [TabBarStackRoutes.DEVICE_SETTINGS]: undefined;
  [TabBarStackRoutes.SLEEP_SCREEN]: undefined;
};

export type TabStackScreenProps<T extends keyof TabStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

const Tab = createBottomTabNavigator<TabStackParamList>();

export function TabNavigator() {
  const { animatedStyle } = useThemeInterpolation(
    Colors.white,
    Colors.primaryBlack,
  );
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fab} // Style for FAB
          onPress={() => navigation.navigate(RootStackRoutes.CHATBOT)} // Navigate to chatbot page
        >
          <Icon
            type="ionicon"
            name="chatbox-ellipses-outline"
            size={30}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabWrapper}>
        <Tab.Navigator
          screenOptions={{
            ...tabConfig,
            tabBarStyle: {
              ...styles.tabBar,
              height: '8%',

              ...Platform.select({
                ios: {
                  shadowColor: Colors.black,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
                android: {
                  elevation: 5,
                },
              }),
            },
            tabBarActiveTintColor: Colors.white,
            tabBarInactiveTintColor: Colors.grey1,
          }}
        >
          <Tab.Screen
            name={TabBarStackRoutes.HOME}
            component={Home}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Animated.View style={[animatedStyle, styles.tabIconContainer]}>
                  <View style={focused && styles.activeTabStyle}>
                    <Icon
                      type="antdesign"
                      name="home"
                      size={24}
                      color={color}
                    />
                  </View>
                </Animated.View>
              ),
            }}
          />

          <Tab.Screen
            name={TabBarStackRoutes.SLEEP_SCREEN}
            component={SleepScreen}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Animated.View style={[animatedStyle, styles.tabIconContainer]}>
                  <View style={focused && styles.activeTabStyle}>
                    <Icon
                      type="ionicon"
                      name="moon-outline"
                      size={24}
                      color={color}
                    />
                  </View>
                </Animated.View>
              ),
            }}
          />
          <Tab.Screen
            name={TabBarStackRoutes.DEVICE_SETTINGS}
            component={DeviceSettings}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Animated.View style={[animatedStyle, styles.tabIconContainer]}>
                  <View style={focused && styles.activeTabStyle}>
                    <Icon
                      type="ionicon"
                      name="watch-outline"
                      size={24}
                      color={color}
                    />
                  </View>
                </Animated.View>
              ),
            }}
          />
          <Tab.Screen
            name={TabBarStackRoutes.PROFILE}
            component={Profile}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Animated.View style={[animatedStyle, styles.tabIconContainer]}>
                  <View style={focused && styles.activeTabStyle}>
                    <Icon
                      type="ionicon"
                      name="person"
                      size={24}
                      color={color}
                    />
                  </View>
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
    backgroundColor: Colors.white,
  },
  tabWrapper: {
    flex: 1,
    overflow: 'hidden',
    paddingBottom: 30,
  },
  tabBar: {
    paddingBottom: 0,
    borderTopWidth: 0,
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    opacity: 0.95,
  },
  tabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabStyle: {
    backgroundColor: Colors.purple2,
    borderRadius: 10,
    padding: 5,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 120,
    right: 25,
    zIndex: 1000,
  },
  fab: {
    backgroundColor: '#834bbe',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

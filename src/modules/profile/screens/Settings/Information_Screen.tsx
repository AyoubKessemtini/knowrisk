import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CImage } from '../../../../components/CImage';
import ImageAssets from '@assets/images';

export const SettingsInformationScreen =
  ({}: OnboardingStackScreenProps<'SettingsInformationScreen'>): JSX.Element => {
    const permissionsData = [
      {
        title: 'App usage',
        description:
          'Ensure uninterrupted data flow by keeping the app running. Closing the app may result in data loss.',
        icon: ImageAssets.REFRESH_ICON,
      },
      {
        title: 'Notification',
        description:
          'Stay informed! Enable notification permissions to receive timely updates and alerts from the app.',
        icon: ImageAssets.REFRESH_ICON,
      },
      {
        title: 'Location',
        description:
          'Enhance your experience! Grant GPS permission to unlock location-based features and personalized content.',
        icon: ImageAssets.REFRESH_ICON,
      },
      {
        title: 'Bluetooth',
        description:
          'Connect seamlessly! Authorize Bluetooth permissions to enable effortless communication with compatible devices.',
        icon: ImageAssets.BLUETOOTH_ICON,
      },
      {
        title: 'Battery',
        description:
          'Extend app longevity! Adjust battery permissions to prevent automatic closure by your device, ensuring continuous functionality and uninterrupted user experience.',
        icon: ImageAssets.REFRESH_ICON,
      },
      {
        title: 'Sleep',
        description:
          'Optimize your sleep tracking! Keep the app active during sleep to ensure accurate and insightful analysis of your sleep patterns and quality.',
        icon: ImageAssets.REFRESH_ICON,
      },
    ];

    return (
      <Screen withoutTopEdge noHorizontalPadding>
        <Header hasBackButton text="profile.information" />
        <View style={styles.container}>
          {permissionsData.map((item, index) => (
            <View key={index} style={styles.permissionItem}>
              <CImage source={item.icon} height={18} width={18} />
              <View style={styles.textContainer}>
                <CText size="sm_medium" color="purple1">
                  {item.title}
                </CText>
                <CText size="xm_medium" color="purpleGrey">
                  {item.description}
                </CText>
              </View>
            </View>
          ))}
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
});

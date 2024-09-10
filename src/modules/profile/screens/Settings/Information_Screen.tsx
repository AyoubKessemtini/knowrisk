import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CImage } from '@components/CImage';
import ImageAssets from '@assets/images';
import { I18nKeyPath } from '../../../../i18n/types';

export const SettingsInformationScreen =
  ({}: OnboardingStackScreenProps<'SettingsInformationScreen'>): JSX.Element => {
    const permissionsData: Array<{
      title: I18nKeyPath;
      description: I18nKeyPath;
      icon: string;
    }> = [
      {
        title: 'informations.app_usage' as I18nKeyPath,
        description: 'informations.app_usage_description' as I18nKeyPath,
        icon: ImageAssets.REFRESH_ICON,
      },
      {
        title: 'informations.notification' as I18nKeyPath,
        description: 'informations.notification_description' as I18nKeyPath,
        icon: ImageAssets.NOTIFICATION_ICON,
      },
      {
        title: 'informations.location' as I18nKeyPath,
        description: 'informations.location_description' as I18nKeyPath,
        icon: ImageAssets.PIN_ICON,
      },
      {
        title: 'informations.bluetooth' as I18nKeyPath,
        description: 'informations.bluetooth_description' as I18nKeyPath,
        icon: ImageAssets.BLUETOOTH_ICON,
      },
      {
        title: 'informations.battery' as I18nKeyPath,
        description: 'informations.battery_description' as I18nKeyPath,
        icon: ImageAssets.BATTERY_ICON,
      },
      {
        title: 'segment.sleep' as I18nKeyPath,
        description: 'informations.sleep_description' as I18nKeyPath,
        icon: ImageAssets.MOON_ICON,
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
                <CText size="sm_medium" color="purple1" text={item.title} />
                <CText
                  size="xm_medium"
                  color="purpleGrey"
                  text={item.description}
                />
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

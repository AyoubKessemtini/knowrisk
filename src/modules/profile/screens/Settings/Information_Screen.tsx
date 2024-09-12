import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CImage } from '@components/CImage';
import ImageAssets from '@assets/images';
import { I18nKeyPath } from '../../../../i18n/types';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { ProfileHeader } from '../../../../components/Headers/ProfileHeader';
import { Colors } from '@constants/Colors';

export const SettingsInformationScreen =
  ({}: RootStackScreenProps<'SettingsInformationScreen'>): JSX.Element => {
    const permissionsData: Array<{
      title: I18nKeyPath;
      description: I18nKeyPath;
      icon: string;
    }> = [
      {
        title: 'informations.app_usage',
        description: 'informations.app_usage_description',
        icon: ImageAssets.REFRESH_ICON,
      },
      {
        title: 'informations.notification',
        description: 'informations.notification_description',
        icon: ImageAssets.NOTIFICATION_ICON,
      },
      {
        title: 'informations.location',
        description: 'informations.location_description',
        icon: ImageAssets.PIN_ICON,
      },
      {
        title: 'informations.bluetooth',
        description: 'informations.bluetooth_description',
        icon: ImageAssets.BLUETOOTH_ICON,
      },
      {
        title: 'informations.battery',
        description: 'informations.battery_description',
        icon: ImageAssets.BATTERY_ICON,
      },
      {
        title: 'segment.sleep',
        description: 'informations.sleep_description',
        icon: ImageAssets.MOON_ICON,
      },
    ];

    return (
      <Screen withoutTopEdge noHorizontalPadding>
        <ProfileHeader
          hasBackButton
          text="profile.information"
          backgroundColor={Colors.magnolia}
        />
        <View style={styles.line}></View>
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
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderColor: Colors.fog,
  },
});

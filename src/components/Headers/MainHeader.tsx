import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/Colors';
import { CImage } from '@components/CImage';
import ImageAssets from '@assets/images';

interface MainHeaderProps {
  profilePicture: string;
}

export const MainHeader = ({ profilePicture }: MainHeaderProps) => {
  return (
    <View style={styles.container}>
      <CImage source={ImageAssets.APP_ICON} width={151} height={26} />
      {profilePicture && (
        <CImage
          source={profilePicture}
          width={43}
          height={43}
          containerStyle={{ borderRadius: 22 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryWhite,
    ...Platform.select({
      ios: {
        paddingVertical: 20,
        paddingHorizontal: 20,
      },
      android: {
        paddingVertical: 20,
        paddingHorizontal: 20,
      },
    }),
  },
});

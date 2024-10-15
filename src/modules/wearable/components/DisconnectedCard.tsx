import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { CImage } from '@components/CImage.tsx';
import ImageAssets from '@assets/images';

export const DisconnectedCard = () => {
  return (
    <View style={styles.container}>
      <View>
        <CText
          size="md"
          text="wearable.disconnected"
          color={'brick'}
          mt={10}
          mb={15}
        />
        <CText
          size="xs_bold"
          text="wearable.scan_device_to_connect"
          color={'grey3'}
        >
          Scan device to conect
        </CText>
      </View>
      <View>
        <CImage
          source={ImageAssets.DISCONNECTED_DEVICE}
          height={70}
          width={70}
        ></CImage>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 8,
    paddingLeft: 14,
    paddingRight: 14,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: Colors.lightRed,
    gap: 5,
    width: '100%',
  },
});

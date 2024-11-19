import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { CImage } from '@components/CImage.tsx';
import ImageAssets from '@assets/images';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-easy-icon';
import { RootState, useAppSelector } from '@store/index.ts';

interface ConnectedCardProps {
  deviceName: string;
}
export const ConnectedCard = ({ deviceName }: ConnectedCardProps) => {
  const { battery } = useAppSelector((state: RootState) => state.bleData);
  return (
    <View style={styles.container}>
      <View>
        <CText
          size="md"
          text="wearable.connected_to_device"
          color={'white'}
          mt={25}
          mb={5}
        />
        <CText size="xs_bold" color={'white'}>
          {deviceName}
        </CText>
        <View style={styles.progressContainer}>
          <Icon
            type="ionicon"
            name="battery-half-outline"
            size={24}
            color="white"
          />
          <CircularProgress
            value={battery !== '--' ? parseInt(battery, 10) : 0}
            maxValue={100}
            radius={45}
            showProgressValue={true}
            inActiveStrokeOpacity={0.3}
            inActiveStrokeColor={'white'}
            activeStrokeWidth={5}
            inActiveStrokeWidth={5}
            duration={250}
            titleColor={Colors.green}
          />
        </View>
      </View>
      <View>
        <CImage
          source={ImageAssets.CONNECTED_DEVICE}
          height={160}
          width={160}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 0,
    paddingLeft: 20,
    paddingHorizontal: 8,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: Colors.purple2,
    gap: 5,
    width: '100%',
  },
  progressContainer: {
    marginLeft: -30,
    transform: [{ scale: 0.6 }],
  },
});

/*
 //
                    <ion-icon name="battery-full-outline"></ion-icon>
                    //
                    <ion-icon name="battery-half-outline"></ion-icon>
                    //
                    <ion-icon name="battery-dead-outline"></ion-icon>
 */

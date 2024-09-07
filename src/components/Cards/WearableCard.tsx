import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CImage } from '@components/CImage';
import ImageAssets from '@assets/images';

type WearableCardProps = {
  minutesDuration: number;
  lastConnection: string;
};

// Helper function to convert minutes to hours and minutes
const formatMinutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const WearableCard = ({
  minutesDuration,
  lastConnection,
}: WearableCardProps) => {
  const formattedDuration = formatMinutesToHours(minutesDuration);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CImage source={ImageAssets.WEARABLE_ICON} height={22} width={22} />
        <CText
          size="sm_semiBold"
          color="darkPurple"
          text="home_screen.wearability"
        />
      </View>

      <CircularProgress
        value={minutesDuration}
        showProgressValue={false}
        radius={45}
        maxValue={1000} // Adjust based on max minutes possible
        activeStrokeColor={Colors.purple2}
        inActiveStrokeColor={Colors.lightPurple}
        inActiveStrokeOpacity={0.3}
        title={formattedDuration}
        titleColor={Colors.deepPurple}
        activeStrokeWidth={8}
        inActiveStrokeWidth={8}
        titleStyle={{ fontSize: 14, fontWeight: 'bold' }}
        duration={1000}
      />

      <CText
        mb={100}
        size="sm"
        color="grey4"
        style={{ paddingHorizontal: 10 }}
        isCentered
      >
        Last Connection {lastConnection}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.lightPurple,
    padding: 10,
    borderRadius: 16,
    width: '48%',
    maxHeight: 175,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import CircularProgress from 'react-native-circular-progress-indicator';

type WeatherCardProps = {
  temperature: number;
  lastUpdated: string;
};

export const WeatherCard = ({ temperature, lastUpdated }: WeatherCardProps) => {
  return (
    <View style={styles.container}>
      <CText mb={10} size="sm_semiBold" color="black">
        Temperature
      </CText>

      <CircularProgress
        value={temperature}
        showProgressValue={false}
        radius={50}
        maxValue={50}
        activeStrokeColor={Colors.purple2}
        inActiveStrokeColor={Colors.lightPurple}
        inActiveStrokeOpacity={0.3}
        title={`${temperature}°C`}
        titleColor={Colors.deepPurple}
        activeStrokeWidth={10}
        inActiveStrokeWidth={10}
        titleStyle={{ fontSize: 16, fontWeight: 'bold' }}
        duration={1000}
      />

      <CText mb={100} size="sm" color="grey4">
        Last Update {lastUpdated}
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
    width: '49%',
    maxHeight: 170,
  },
});

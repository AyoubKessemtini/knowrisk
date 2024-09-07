import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import TextChip from '@components/TextChip';
import Icon from 'react-native-easy-icon';
import { IconType } from 'react-native-easy-icon/src/Icon';

type LocationWeatherProps = {
  temperature: number;
  lastUpdated: string;
  city: string;
  description: string;
};

const getWeatherIcon = (description: string) => {
  switch (description) {
    case 'clear sky':
      return { name: 'day-sunny', type: 'fontisto' };
    case 'few clouds':
      return { name: 'day-cloudy', type: 'fontisto' };
    case 'scattered clouds':
      return { name: 'cloudy', type: 'fontisto' };
    case 'broken clouds':
      return { name: 'cloudy', type: 'fontisto' };
    case 'shower rain':
      return { name: 'rain', type: 'fontisto' };
    case 'rain':
      return { name: 'day-rain', type: 'fontisto' };
    case 'thunderstorm':
      return { name: 'lightning', type: 'fontisto' };
    case 'snow':
      return { name: 'snow', type: 'fontisto' };
    case 'mist':
      return { name: 'fog', type: 'fontisto' };
    default:
      return { name: 'cloudy', type: 'fontisto' };
  }
};

export const LocationWeather = ({
  temperature,
  city,
  description,
}: LocationWeatherProps) => {
  const icon = getWeatherIcon(description);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Icon
          type={icon.type as IconType}
          name={icon.name}
          size={30}
          color={Colors.white}
        />
        <CText size="xl_semiBold" color="white">
          {temperature}°C
        </CText>
      </View>

      <View style={styles.line} />
      <TextChip
        text={city}
        textColor="white"
        backgroundColor={Colors.white + '60'}
        leftAccessory={
          <Icon
            color={Colors.grey1}
            size={15}
            type="simple-line-icon"
            name="location-pin"
          />
        }
      />
      <CText size="md_medium" color="white" mt={5}>
        {description}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.purple,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
    width: '50%',
    height: 170,
  },
  line: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.white,
    height: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    width: '100%',
    alignItems: 'center',
  },
});

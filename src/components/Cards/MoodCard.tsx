import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { CImage } from '@components/CImage';
import Icon from 'react-native-easy-icon';

type MoodCardProps = {
  mood: string;
  percentage: number;
  lastUpdated: string;
  icon: string;
};

export const MoodCard = ({
  mood,
  percentage,
  lastUpdated,
  icon,
}: MoodCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CText mb={10} size="sm_semiBold" color="black">
          Mood
        </CText>
        <Icon
          type="entypo"
          name="dots-three-horizontal"
          size={20}
          color={Colors.black}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          <CText color="deepPurple" size="lg_semiBold">
            {mood} {percentage}%
          </CText>
          <CImage source={icon} height={25} width={25} />
        </View>

        <CText
          size="xs"
          isCentered
          color="grey4"
          text="home_screen.last_updated"
          textOptions={{ date: lastUpdated }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: Colors.lightPurple,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.grey1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
});

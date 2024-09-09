import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-easy-icon';
import { HeartRateCard } from './HeartRatesCard';
import ImageAssets from '@assets/images';

type WeeklyHeartInfosCardProps = {
  heartRateData: string;
  restingHeartRateData: string;
  date: string;
  lastUpdated: string;
};

export const WeeklyHeartInfosCard = ({
  heartRateData,
  restingHeartRateData,
  date,
  lastUpdated,
}: WeeklyHeartInfosCardProps) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: Colors.white,
            paddingVertical: 10,
            paddingHorizontal: 10,
          },
        ]}
      >
        <CText mb={10} size="sm_semiBold" color="purple" text="heart.heart" />
        <Icon
          type="entypo"
          name="dots-three-horizontal"
          size={20}
          color={Colors.grey4}
        />
      </View>
      <CText
        text="common.past_days"
        textOptions={{ number: 7 }}
        size="sm_light"
        color="grey3"
        style={styles.wrapper}
      />
      <HeartRateCard
        heartRateData={heartRateData}
        date={date}
        tittle="heart.heart"
        icon={ImageAssets.BAR_CHART_ICON}
      />

      <HeartRateCard
        heartRateData={restingHeartRateData}
        date={date}
        tittle="heart.restingHeartRate"
        icon={ImageAssets.LINE_CHART_ICON}
      />
      <CText
        size="xs_medium"
        color="grey4"
        text="home_screen.last_updated"
        textOptions={{ date: lastUpdated }}
        isCentered
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPurple,
    borderRadius: 16,
    width: '49%',
    justifyContent: 'space-between',
    borderWidth: 1.4,
    borderColor: Colors.grey1,
    overflow: 'hidden',
    gap: 10,
    paddingBottom: 10,
  },
  wrapper: {
    paddingHorizontal: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

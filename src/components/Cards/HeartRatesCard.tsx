import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-easy-icon';
import { CImage } from '@components/CImage';
import { I18nKeyPath } from 'src/i18n/types';

type HeartRateCardProps = {
  heartRateData: string;
  date: string;
  tittle: I18nKeyPath;
  icon: string;
};

export const HeartRateCard = ({
  heartRateData,
  date,
  tittle,
  icon,
}: HeartRateCardProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { gap: 5 }]}>
        <Icon type="entypo" name="heart" size={15} color={Colors.purple1} />
        <CText size="xm_semiBold" color="purple1" text={tittle} />
      </View>
      <CText size="xs_medium" color="grey3">
        {date}
      </CText>

      <View style={styles.heartRateRow}>
        <CText size="lg_semiBold" color="purple1">
          {heartRateData}
        </CText>
        <CText size="xs_medium" color="grey3" text="heart.bpm" />
        <CImage source={icon} width={50} height={25} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 15,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  heartRateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
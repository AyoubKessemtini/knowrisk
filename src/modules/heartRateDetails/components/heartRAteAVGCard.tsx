import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-easy-icon';

type HeartRateAVGCardProps = {
  dateTime: string;
  title: string;
  value: string;
};

export const HeartRateAVGCard = ({
  dateTime = '13:44',
  title = 'Heart rate',
  value = '77',
}: HeartRateAVGCardProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header, { gap: 5 }]}>
        <View style={[styles.row, { gap: 5 }]}>
          <Icon type="entypo" name="heart" size={15} color={Colors.purple1} />
          <CText size="xm_semiBold" color="purple1">
            {title}
          </CText>
        </View>
        <CText size="xs_medium" color="grey3">
          {dateTime}
        </CText>
      </View>
      <View style={[styles.row, { marginTop: 15, gap: 5 }]}>
        <CText size="lg_bold" color="deepPurple">
          {value}
        </CText>
        <CText size="xm_semiBold" color="grey3">
          BPM
        </CText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPurple,
    borderRadius: 12,
    padding: 15,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'space-between',
  },
});

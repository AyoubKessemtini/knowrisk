import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-easy-icon';

interface Journal {
  id: number;
  title: string;
  content: string;
  date: string;
}

export const Journal: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CText mb={10} size="sm_semiBold" color="white">
          Daily questions
        </CText>
        <Icon
          type="entypo"
          name="dots-three-horizontal"
          size={20}
          color={Colors.white}
        />
      </View>
      <View style={styles.cardContent}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            console.log('go to journal');
          }}
        >
          <CText size="sm_bold" color="white">
            Today questions
          </CText>
          <CText size="xs" style={styles.date}>
            Answered/To answer
          </CText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '49%',
    backgroundColor: Colors.purple2,
    borderRadius: 16,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.purple2,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardContent: {
    marginTop: 10,
  },
  card: {
    backgroundColor: Colors.white + '60',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
  },
  date: {
    fontSize: 14,
    color: Colors.grey1,
  },
});

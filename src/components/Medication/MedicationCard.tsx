import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { CImage } from '../CImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

interface MedicationCardProps {
  imageSource: string;
  title: string;
  dosage: string;
  frequency: string;
  scheduleMessage: string;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  imageSource,
  title,
  dosage,
  frequency,
  scheduleMessage,
}) => {
  return (
    <View style={styles.container}>
      <CImage
        source={imageSource}
        height={100}
        width={100}
        containerStyle={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.dosage}>{dosage}</Text>
        <View style={styles.textRow}>
          <Feather name="calendar" style={styles.icon} />
          <Text style={styles.frequency}>{frequency}</Text>
        </View>
        <View style={styles.textRow}>
          <MaterialCommunityIcons
            name="information-outline"
            style={styles.icon}
          />
          <Text style={styles.scheduleMessage}>{scheduleMessage}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.purple,
  },
  dosage: {
    marginBottom: 10,
    fontSize: 16,
    color: Colors.purpleGrey,
    marginVertical: 2,
  },
  frequency: {
    fontSize: 14,
    color: Colors.independence,
    marginVertical: 2,
  },
  scheduleMessage: {
    fontSize: 14,
    color: Colors.independence,
  },
  textRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
});

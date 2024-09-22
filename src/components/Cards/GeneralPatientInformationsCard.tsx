import { CText } from '@components/CText';
import TextChip from '@components/TextChip';
import { Colors } from '@constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-easy-icon';

interface PatientInfoCardProps {
  name: string;
  id: string;
  lastSeizure: string;
  seizureFrequency: string;
  seizureRisk: string;
  seizureForecast: string;
  isDevicePaired: boolean;
}

export const PatientInfoCard = ({
  name,
  id,
  lastSeizure,
  seizureFrequency,
  seizureRisk,
  seizureForecast,
  isDevicePaired,
}: PatientInfoCardProps) => {
  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.nameSection}>
          <CText size="lg_semiBold" color="darkPurple">
            {name}
          </CText>
          <Icon
            type="font-awesome"
            name="external-link"
            size={14}
            color={Colors.grey3}
          />
        </View>
        <TextChip
          paddingVertical={3}
          text={isDevicePaired ? 'Device is Paired' : 'Device not Paired'}
          textSize="xm_medium"
          backgroundColor={Colors.lightGreen}
          textColor="green"
          leftAccessory={
            <Icon
              type="material"
              name="wifi"
              size={18}
              color={isDevicePaired ? Colors.green : Colors.deepPurple}
            />
          }
        />
      </View>

      {/* ID Section */}
      <CText color="grey4" size="md_medium" style={styles.idText}>
        {id}
      </CText>

      {/* Details Section */}
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <CText color="darkPurple" size="xm_medium">
            Last Seizures :
          </CText>
          <CText size="xm_medium" color="grey4">
            {lastSeizure}
          </CText>
        </View>
        <View style={styles.detailItem}>
          <CText color="darkPurple" size="xm_medium">
            Seizure Risk :
          </CText>
          <TextChip
            isCentred={false}
            paddingVertical={5}
            text={seizureRisk}
            textSize="xm_medium"
            backgroundColor={Colors.lightYellow}
            textColor="deepYellow"
            leftAccessory={
              <Icon
                type="font-awesome"
                name="smile-o"
                size={16}
                color={Colors.yellow}
              />
            }
          />
        </View>
        <View style={styles.detailItem}>
          <CText color="darkPurple" size="xm_medium">
            Seizure Frequency :
          </CText>
          <CText size="xm_medium" color="grey4">
            {seizureFrequency}
          </CText>
        </View>

        <View style={styles.detailItem}>
          <CText color="darkPurple" size="xm_medium">
            Seizure Forecast Calendar :
          </CText>
          <Icon
            type="material"
            name="calendar-today"
            size={20}
            color={Colors.grey4}
          />
        </View>

        <View style={styles.detailItem}>
          <CText color="darkPurple" size="xm_medium">
            Seizure Forecast :
          </CText>
          <TextChip
            isCentred={false}
            paddingVertical={5}
            text={seizureForecast}
            textSize="xm_medium"
            backgroundColor={Colors.lightYellow}
            textColor="deepYellow"
            leftAccessory={
              <Icon
                type="font-awesome"
                name="smile-o"
                size={16}
                color={Colors.yellow}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightPurple,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 350,
    maxWidth: 360,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  idText: {
    marginBottom: 12,
  },
  details: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    gap: 5,
  },
  detailItem: {
    width: '49%', // Adjusted to properly align in two columns with spacing
    marginBottom: 3,
  },
});

export default PatientInfoCard;

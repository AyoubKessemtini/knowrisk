import { CText } from '@components/CText';
import TextChip from '@components/TextChip';
import { Colors } from '@constants/Colors';
import { RootStackRoutes } from '@navigators/routes';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-easy-icon';

interface PatientInfoCardProps {
  name: string;
  id: string;
  lastSeizure: string;
  seizureFrequency: string;
  seizureRisk: string;
  isDevicePaired: boolean;
  mood: string;
  temp: number | string;
}

export const PatientInfoCard = ({
  name,
  id,
  lastSeizure,
  seizureFrequency,
  seizureRisk,
  temp,
  mood,
  isDevicePaired,
}: PatientInfoCardProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.nameSection}>
          <CText size="lg_semiBold" color="darkPurple">
            {name}
          </CText>
        </View>
        <TextChip
          paddingVertical={3}
          text={isDevicePaired ? 'Device is Paired' : 'Device not Paired'}
          textSize="xm_medium"
          backgroundColor={isDevicePaired ? Colors.lightGreen : Colors.lightRed}
          textColor={isDevicePaired ? 'green' : 'deepRed'}
          leftAccessory={
            <Icon
              type="material"
              name={isDevicePaired ? 'bluetooth' : 'bluetooth-disabled'}
              size={18}
              color={isDevicePaired ? Colors.green : Colors.red}
            />
          }
        />
      </View>

      {/* ID Section */}
      <CText color="grey4" size="md_small" style={styles.idText}>
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

        <Pressable
          onPress={() => {
            navigation.navigate(RootStackRoutes.SEIZURE_FORCAST_SCREEN);
          }}
          style={styles.detailItem}
        >
          <CText color="darkPurple" size="xm_medium">
            Seizure Forecast Calendar :
          </CText>
          <Icon
            type="material"
            name="calendar-today"
            size={20}
            color={Colors.grey4}
          />
        </Pressable>

        <View style={styles.detailItem}>
          <CText color="darkPurple" size="xm_medium">
            Body temperature :
          </CText>
          <CText size="xm_medium" color="grey4">
            {temp} °C
          </CText>
        </View>
        <View style={styles.detailItem}>
          <CText color="darkPurple" size="xm_medium">
            mood :
          </CText>
          <TextChip
            isCentred={false}
            paddingVertical={5}
            text={mood}
            textSize="xm_medium"
            backgroundColor={Colors.lightGreen}
            textColor="green"
            leftAccessory={
              <Icon
                type="font-awesome"
                name="smile-o"
                size={16}
                color={Colors.green2}
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

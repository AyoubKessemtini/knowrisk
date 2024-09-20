import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { BirthDateSelector } from '@components/DatePicker/BirthdayDatePicker';
import { HourPicker } from '../../components/HourPicker';
import { styles } from './styles';

export const ReportSeizureQuestion1 =
  ({}: RootStackScreenProps<'ReportSeizureQuestion1'>): JSX.Element => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (newDate: Date) => {
      setSelectedDate(newDate);
    };

    return (
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header
          hasBackButton
          useCustomBackButton
          text="report_seizure.report_seizure"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <CText
            size="xl_medium"
            color="purple1"
            text="report_seizure.last_seizure_time_question"
            isCentered
          />

          <View style={style.square}>
            <CText text="common.date" />
            <BirthDateSelector
              initialDate={selectedDate}
              onDateChange={handleDateChange}
            />

            <CText text="report_seizure.it_happened" />

            <View style={style.horizontalContainer}>
              <HourPicker />
              <CText text="report_seizure.between" />
              <HourPicker />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <CButton
            mt={20}
            text="common.continue"
            onPress={() => {
              navigation.navigate(
                RootStackRoutes.REPORT_SEIZURE_QUESTION_TWO_SCREEN,
              );
            }}
          />
        </View>
      </Screen>
    );
  };

const style = StyleSheet.create({
  square: {
    marginTop: 20,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

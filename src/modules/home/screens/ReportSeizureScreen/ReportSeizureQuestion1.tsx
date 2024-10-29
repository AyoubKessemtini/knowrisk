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
import { useDispatch } from 'react-redux';
import { setDate, setTimeFrom, setTimeTo } from '@store/reportSeizureFormSlice';

export const ReportSeizureQuestion1 =
  ({}: RootStackScreenProps<'ReportSeizureQuestion1'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State local pour gérer la date et les heures
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeFrom, setTimeFromState] = useState('');
    const [timeTo, setTimeToState] = useState('');

    // Gérer le changement de date et enregistrer dans Redux
    const handleDateChange = (newDate: Date) => {
      const formattedDate = new Date(newDate).toISOString().split('T')[0]; // Format YYYY-MM-DD

      setSelectedDate(newDate);
      dispatch(setDate(formattedDate)); // Sauvegarde la date comme chaîne ISO
    };
    function formatTimeString(time: string | Date): string {
      // Vérifiez si `time` est une chaîne et créez un objet `Date` valide
      let dateObj: Date;
      if (typeof time === 'string') {
        // Ajoutez une date de base pour éviter les erreurs, puis parsez uniquement l’heure
        const [hour, minute] = time.split(':');
        dateObj = new Date();
        dateObj.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
      } else {
        dateObj = time;
      }

      // Formatage de l'heure en chaîne "HH:mm"
      return dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }

    // Gérer l'heure de début et enregistrer dans Redux
    const handleTimeFromChange = (time: string) => {
      const formattedTimeFrom = formatTimeString(timeFrom); // Renvoie "HH:mm"

      setTimeFromState(time);
      dispatch(setTimeFrom(formattedTimeFrom.toString()));
    };

    // Gérer l'heure de fin et enregistrer dans Redux
    const handleTimeToChange = (time: string) => {
      const formattedTimeTo = formatTimeString(timeFrom); // Renvoie "HH:mm"

      setTimeToState(time);
      dispatch(setTimeTo(formattedTimeTo.toString()));
    };

    // Naviguer vers l'écran suivant après avoir défini les valeurs
    const handleContinue = () => {
      navigation.navigate(RootStackRoutes.REPORT_SEIZURE_QUESTION_TWO_SCREEN);
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
              <HourPicker
                selectedTime={timeFrom}
                onTimeChange={handleTimeFromChange}
              />
              <CText text="report_seizure.between" />
              <HourPicker
                selectedTime={timeTo}
                onTimeChange={handleTimeToChange}
              />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <CButton mt={20} text="common.continue" onPress={handleContinue} />
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

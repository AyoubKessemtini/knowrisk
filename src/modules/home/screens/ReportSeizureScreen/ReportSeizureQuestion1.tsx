import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { BirthDateSelector } from '@components/DatePicker/BirthdayDatePicker';
import { HourPicker } from '../../components/HourPicker';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setDate, setTimeFrom, setTimeTo } from '@store/reportSeizureFormSlice';
import { Alert } from 'react-native';

export const ReportSeizureQuestion1 =
  ({}: RootStackScreenProps<'ReportSeizureQuestion1'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State local pour gérer la date et les heures
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeFrom, setTimeFromState] = useState('');
    const [timeTo, setTimeToState] = useState('');
    useEffect(() => {
      const today = new Date().toISOString().split('T')[0]; // Format today's date
      setSelectedDate(new Date()); // Set local state to today
      dispatch(setDate(today)); // Dispatch today's date to Redux
    }, [dispatch]);
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
    const parseTime = (time: string): Date => {
      const date = new Date();
      const timeParts = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)?$/i);

      if (!timeParts) {
        throw new Error(`Invalid time format: ${time}`);
      }

      const hour = parseInt(timeParts[1], 10); // Convert hour to number
      const minute = parseInt(timeParts[2], 10); // Convert minute to number
      const period = timeParts[3]; // AM/PM part (if present)

      let adjustedHour = hour; // Declare a separate variable for adjustments

      if (period) {
        // Adjust for 12-hour clock
        if (period.toUpperCase() === 'PM' && hour < 12) {
          adjustedHour += 12;
        } else if (period.toUpperCase() === 'AM' && hour === 12) {
          adjustedHour = 0;
        }
      }

      date.setHours(adjustedHour, minute, 0, 0);
      return date;
    };
    const handleContinue = () => {
      try {
        const fromTime = parseTime(timeFrom);
        const toTime = parseTime(timeTo);
        console.log('date is' + fromTime);
        console.log('date is timeTo' + timeTo);

        if (fromTime >= toTime) {
          Alert.alert(
            'Time Error',
            'The start time must be earlier than the end time.',
            [{ text: 'OK' }],
          );
          return;
        } else
          navigation.navigate(
            RootStackRoutes.REPORT_SEIZURE_QUESTION_TWO_SCREEN,
          );
      } catch (error) {
        console.error('error parsing');
        Alert.alert('Invalid Time Format', 'Please enter a valid time.', [
          { text: 'OK' },
        ]);
      }
    };
    // Gérer l'heure de début et enregistrer dans Redux
    const handleTimeFromChange = (time: string) => {
      const formattedTimeFrom = formatTimeString(time); // Renvoie "HH:mm"
      console.log('formattedTimeFrom' + formattedTimeFrom.toString);
      setTimeFromState(time);

      dispatch(setTimeFrom(formattedTimeFrom.toString()));
    };

    // Gérer l'heure de fin et enregistrer dans Redux
    const handleTimeToChange = (time: string) => {
      const formattedTimeTo = formatTimeString(time); // Renvoie "HH:mm"
      console.log('formattedTimeTo' + formattedTimeTo.toString);

      setTimeToState(time);
      // Vérification si `timeTo` est postérieur à `timeFrom`

      dispatch(setTimeTo(formattedTimeTo.toString()));
    };

    // Naviguer vers l'écran suivant après avoir défini les valeurs
    // const handleContinue = () => {
    //   if (timeFrom && timeTo && timeFrom >= timeTo) {
    //     Alert.alert(
    //       'Time Error',
    //       'The start time must be earlier than the end time.',
    //       [{ text: 'OK' }],
    //     );
    //     return; // Arrête l'exécution si la condition n'est pas respectée
    //   } else
    //     navigation.navigate(RootStackRoutes.REPORT_SEIZURE_QUESTION_TWO_SCREEN);
    // };

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

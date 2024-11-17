import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Colors } from '@constants/Colors';
import { BirthDateSelector } from '@components/DatePicker/BirthdayDatePicker';
import { HourPicker } from '../../components/HourPicker';
import { useDispatch } from 'react-redux';
import {
  setDateUpdated,
  setTimeFromUpdated,
  setTimeToUpdated,
} from '@store/reportSeizureUpdateFormSlice';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '@navigators/stacks/RootNavigator';
import { styles } from './styles';

type ReportSeizureQuestion1UpdatedRouteProp = RouteProp<
  RootStackParamList,
  'ReportSeizureQuestion1Updated'
>;

export const ReportSeizureQuestion1Updated: React.FC<
  RootStackScreenProps<'ReportSeizureQuestion1Updated'>
> = () => {
  const navigation = useNavigation();
  const route = useRoute<ReportSeizureQuestion1UpdatedRouteProp>();
  const dispatch = useDispatch();

  const { seizureEvent } = route.params;

  const [selectedDate, setSelectedDate] = useState(
    seizureEvent ? new Date(seizureEvent.date) : new Date(),
  );
  const [timeFrom, setTimeFromState] = useState(seizureEvent?.time_from || '');
  const [timeTo, setTimeToState] = useState(seizureEvent?.time_to || '');

  useEffect(() => {
    if (seizureEvent) {
      dispatch(setDateUpdated(seizureEvent.date));
      dispatch(setTimeFromUpdated(seizureEvent.time_from));
      dispatch(setTimeToUpdated(seizureEvent.time_to));
    }
  }, [dispatch, seizureEvent]);

  const handleDateChange = (newDate: Date) => {
    const formattedDate = new Date(newDate).toISOString().split('T')[0];
    setSelectedDate(newDate);
    dispatch(setDateUpdated(formattedDate));
  };

  const formatTimeString = (time: string | Date): string => {
    let dateObj: Date;
    if (typeof time === 'string') {
      const [hour, minute] = time.split(':');
      dateObj = new Date();
      dateObj.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);
    } else {
      dateObj = time;
    }
    return dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const handleTimeFromChange = (time: string) => {
    const formattedTimeFrom = formatTimeString(time);
    setTimeFromState(time);
    dispatch(setTimeFromUpdated(formattedTimeFrom));
  };

  const handleTimeToChange = (time: string) => {
    const formattedTimeTo = formatTimeString(time);
    setTimeToState(time);
    dispatch(setTimeToUpdated(formattedTimeTo));
  };
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
      }

      const updatedSeizureEvent = {
        ...seizureEvent,
        date: selectedDate.toISOString().split('T')[0],
        time_from: timeFrom,
        time_to: timeTo,
      };

      navigation.navigate(
        RootStackRoutes.REPORT_SEIZURE_QUESTION_UPDATED_TWO_SCREEN,
        {
          seizureEvent: updatedSeizureEvent,
        },
      );
    } catch (error) {
      console.error('error parsing');
      Alert.alert('Invalid Time Format', 'Please enter a valid time.', [
        { text: 'OK' },
      ]);
    }
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
        text="report_seizure.update_seizure"
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

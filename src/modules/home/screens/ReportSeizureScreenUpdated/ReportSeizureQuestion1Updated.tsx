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
  setDate,
  setTimeFrom,
  setTimeTo,
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

  // Initialize state with seizureEvent data
  const [selectedDate, setSelectedDate] = useState(
    seizureEvent ? new Date(seizureEvent.date) : new Date(),
  );
  const [timeFrom, setTimeFromState] = useState(seizureEvent?.time_from || '');
  const [timeTo, setTimeToState] = useState(seizureEvent?.time_to || '');

  // Set date and time in Redux when state changes
  useEffect(() => {
    if (seizureEvent) {
      dispatch(setDate(seizureEvent.date));
      dispatch(setTimeFrom(seizureEvent.time_from));
      dispatch(setTimeTo(seizureEvent.time_to));
    }
  }, [dispatch, seizureEvent]);

  const handleDateChange = (newDate: Date) => {
    const formattedDate = new Date(newDate).toISOString().split('T')[0];
    setSelectedDate(newDate);
    dispatch(setDate(formattedDate));
  };

  function formatTimeString(time: string | Date): string {
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
  }

  const handleTimeFromChange = (time: string) => {
    const formattedTimeFrom = formatTimeString(time);
    setTimeFromState(time);
    dispatch(setTimeFrom(formattedTimeFrom));
  };

  const handleTimeToChange = (time: string) => {
    const formattedTimeTo = formatTimeString(time);
    setTimeToState(time);
    dispatch(setTimeTo(formattedTimeTo));
  };

  const handleContinue = () => {
    if (timeFrom && timeTo && timeFrom >= timeTo) {
      Alert.alert(
        'Time Error',
        'The start time must be earlier than the end time.',
        [{ text: 'OK' }],
      );
      return;
    }
    // Create an updated seizureEvent object with current state values
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

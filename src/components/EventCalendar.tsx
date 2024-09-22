import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface MarkedDates {
  [key: string]: {
    selected: boolean;
    marked?: boolean;
    selectedColor?: string;
  };
}

interface EventCalendarProps {
  markedDates: MarkedDates;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({
  markedDates,
}) => {
  return (
    <View style={styles.container}>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#ffffff',
          todayTextColor: '#3498db',
          selectedDayBackgroundColor: '#3498db',
          arrowColor: '#e74c3c',
          textSectionTitleColor: '#4f4f4f',
          dayTextColor: '#2d4150',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

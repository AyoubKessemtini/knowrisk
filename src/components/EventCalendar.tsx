import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

interface MarkedDates {
  [key: string]: {
    selected: boolean;
    marked?: boolean;
    selectedColor?: string;
  };
}

type EventCalendarProps = {
  markedDates: Record<
    string,
    { selected: boolean; marked: boolean; selectedColor: string }
  >;
  onDayPress?: (day: DateData) => void; // Add optional onDayPress prop
};

export const EventCalendar: React.FC<EventCalendarProps> = ({
  markedDates,
  onDayPress,
}) => {
  return (
    <View style={styles.container}>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        markedDates={markedDates}
        onDayPress={onDayPress} // Pass onDayPress to Calendar component
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

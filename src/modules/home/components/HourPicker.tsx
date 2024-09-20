import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'; // Import DateTimePickerEvent type
import Ionicons from 'react-native-vector-icons/Ionicons';

export const HourPicker = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.timeContainer} onPress={showTimePicker}>
        <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
        <Ionicons name="time-outline" size={24} color="#7e57c2" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="spinner"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 10,
    width: 120,
    justifyContent: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    color: '#9e9e9e',
  },
});

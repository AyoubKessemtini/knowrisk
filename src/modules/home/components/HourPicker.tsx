import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '@constants/Colors';
import { CText } from '@components/CText';

export const HourPicker = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setTempTime(selectedDate);
    }
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const confirmTime = () => {
    setSelectedTime(tempTime);
    setShowPicker(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.timeContainer} onPress={showTimePicker}>
        <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
        <Ionicons name="time-outline" size={21} color={Colors.purple2} />
      </TouchableOpacity>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <DateTimePicker
              value={tempTime}
              mode="time"
              display="spinner"
              onChange={handleChange}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmTime}
            >
              <CText color="white" text="buttons.confirm" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.grey1,
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
    color: Colors.black,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: Colors.purple2,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});

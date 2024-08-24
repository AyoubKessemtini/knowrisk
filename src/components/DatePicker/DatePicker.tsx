import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-easy-icon';

type DateSelectorProps = {
  initialDate: Date;
  onDateChange: (newDate: Date) => void;
};

export const DateSelector = ({
  initialDate,
  onDateChange,
}: DateSelectorProps) => {
  const [date, setDate] = useState(initialDate);
  const [open, setOpen] = useState(false);

  const handleLeftArrow = () => {
    const newDate = new Date(date.setDate(date.getDate() - 1));
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleRightArrow = () => {
    const newDate = new Date(date.setDate(date.getDate() + 1));
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleConfirm = (newDate: Date) => {
    setOpen(false);
    setDate(newDate);
    onDateChange(newDate);
  };

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLeftArrow}>
        <Icon
          type="material"
          name="chevron-left"
          size={30}
          color={Colors.black}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.date} onPress={() => setOpen(true)}>
        <CText size="xl_bold">{isToday ? 'Today' : date.toDateString()}</CText>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRightArrow}>
        <Icon
          type="material"
          name="chevron-right"
          size={30}
          color={Colors.black}
        />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        mode="date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    paddingHorizontal: 12,
  },
});

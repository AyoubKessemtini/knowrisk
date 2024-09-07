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

  const handleConfirm = (newDate: Date) => {
    setOpen(false);
    setDate(newDate);
    onDateChange(newDate);
  };

  const isToday = new Date().toDateString() === date.toDateString();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return `${isToday ? 'Today, ' : ''}${date.toLocaleDateString(undefined, options)}`;
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={handleLeftArrow}>
        <Icon type="material" name="chevron-left" size={30} color={Colors.white} />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.dateContainer}
        onPress={() => setOpen(true)}
      >
        <CText size="sm_medium" color="white">
          {formatDate(date)}
        </CText>
        <Icon
          type="material"
          name="expand-more"
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={handleRightArrow}>
        <Icon type="material" name="chevron-right" size={30} color={Colors.white} />
      </TouchableOpacity> */}

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
    justifyContent: 'center',
    backgroundColor: Colors.deepPurple, // Assuming Colors.deepPurple matches the image
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.deepPurple,
    paddingHorizontal: 12,
  },
});

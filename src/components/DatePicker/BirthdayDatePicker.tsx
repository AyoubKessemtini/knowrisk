import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/Feather';

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

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    return `${date.toLocaleDateString(undefined, options)}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateContainer}
        onPress={() => setOpen(true)}
      >
        {/* Date text on the left */}
        <CText size="sm_medium" color="black" style={styles.dateText}>
          {formatDate(date)}
        </CText>
        {/* Calendar icon on the right */}
        <Feather
          name="calendar"
          size={21}
          color={Colors.deepPurple}
          style={styles.icon}
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
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: Colors.grey1,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateText: {
    flex: 1,
    textAlign: 'left',
  },
  icon: {
    marginLeft: 10,
  },
});

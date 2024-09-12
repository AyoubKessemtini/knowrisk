import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '@constants/Colors';
import { CText } from '@components/CText';

interface SelectBoxProps {
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

export const SelectBox = ({
  options,
  placeholder = 'Select...',
  onSelect,
}: SelectBoxProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    setDropdownVisible(false);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <CText size="md_bold" color="purple">
          {selectedOption ? selectedOption : placeholder}
        </CText>
        <Feather name="chevron-down" size={21} color={Colors.purple} />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            style={styles.dropdown}
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleOptionPress(item)}
              >
                <CText size="md_bold" color="purple">
                  {item}
                </CText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '14%',
    position: 'relative',
    justifyContent: 'center',
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.fadedPurple,
    paddingVertical: 13,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '68%',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  dropdown: {
    maxHeight: 150,
    borderColor: Colors.fadedPurple,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.fadedPurple,
  },
});

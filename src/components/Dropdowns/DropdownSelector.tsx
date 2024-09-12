import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-easy-icon';
import { CText } from '@components/CText';

interface DropdownSelectorProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const DropdownSelector = ({
  options,
  onSelect,
}: DropdownSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <CText style={styles.selectedOptionText}>
          {selectedOption ? selectedOption : 'Select an option'}
        </CText>
        <Icon
          type="feather"
          name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={Colors.fog}
        />
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleSelect(item)}
              >
                <CText>{item}</CText>
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
    borderRadius: 8,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.grey1,
    backgroundColor: Colors.white,
  },
  selectedOptionText: {
    fontSize: 14,
    flex: 1,
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey1,
  },
  optionItem: {
    padding: 12,
    borderRadius: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey1,
  },
});

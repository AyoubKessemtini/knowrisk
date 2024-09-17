import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-easy-icon';
import { CText } from '@components/CText';
import { I18nKeyPath } from '../../i18n/types';

interface DropdownSelectorProps {
  options: I18nKeyPath[];
  onSelect: (option: I18nKeyPath) => void;
}

export const DropdownSelector = ({
  options,
  onSelect,
}: DropdownSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<I18nKeyPath | null>(
    null,
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (option: I18nKeyPath) => {
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
          size={21}
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
                <CText text={item} />
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

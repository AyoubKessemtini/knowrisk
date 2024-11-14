import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { Colors } from '@constants/Colors';

type I18nKeyPath =
  | 'profile.genders.male'
  | 'profile.genders.female'
  | 'profile.genders.other'
  | 'profile.countries.fr'
  | 'profile.countries.lt'
  | 'profile.countries.uk'
  | 'profile.countries.in'
  | 'profile.countries.tn'
  | 'profile.countries.au'
  | 'profile.countries.other';

interface DropdownSelectorProps {
  options: I18nKeyPath[];
  defaultValue?: I18nKeyPath;
  onSelect: (option: I18nKeyPath) => void;
}

const translations: { [key in I18nKeyPath]: string } = {
  'profile.genders.male': 'Male',
  'profile.genders.female': 'Female',
  'profile.genders.other': 'Other',
  'profile.countries.fr': '+33',
  'profile.countries.lt': '+370',
  'profile.countries.uk': '+44',
  'profile.countries.au': '+61',
  'profile.countries.tn': '+216',
  'profile.countries.other': 'Other Country',

};

const t = (key: I18nKeyPath): string => translations[key];

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<I18nKeyPath | null>(
    defaultValue || null,
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    console.log('DropdownSelector mounted with defaultValue:', defaultValue);
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  const handleSelect = (option: I18nKeyPath) => {
    console.log('handleSelect triggered with option:', option);
    setSelectedOption(option);
    onSelect(option);
    setDropdownVisible(false);
  };

  return (
    console.log(
      'DropdownSelector rendered with selectedOption:',
      selectedOption,
    ),
    (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectorContainer}
          onPress={() => {
            console.log('Dropdown toggle pressed');
            setDropdownVisible(!isDropdownVisible);
          }}
        >
          <Text style={styles.selectedOptionText}>
            {selectedOption ? t(selectedOption) : 'Select an option'}
          </Text>
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
                  <Text>{t(item)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    )
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
    zIndex: 10, // Ensures dropdown appears on top

    backgroundColor: Colors.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey1,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey1,
  },
});

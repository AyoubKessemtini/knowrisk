import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { I18nKeyPath } from '../../i18n/types';
import { CText } from '@components/CText';

interface ChoiceBoxOnboardingProps {
  options: I18nKeyPath[];
  onSelect: (value: I18nKeyPath) => void;
  selectedOptions: I18nKeyPath[]; // Holds multiple selected options
  isMultiSelect?: boolean;
}

export const ChoiceBoxOnboarding: React.FC<ChoiceBoxOnboardingProps> = ({
  options,
  onSelect,
  selectedOptions = [],
}) => {
  console.log('Selected Options: ', selectedOptions); // Debugging: Verify selected options

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option);
        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              isSelected ? styles.selectedOption : styles.unselectedOption,
            ]}
            onPress={() => onSelect(option)}
          >
            <CText
              size="sm_medium"
              color={isSelected ? 'white' : 'purpleGrey'}
              text={option}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  option: {
    padding: 13,
    borderRadius: 8,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: Colors.deepPurple,
  },
  unselectedOption: {
    backgroundColor: Colors.grey1,
  },
});

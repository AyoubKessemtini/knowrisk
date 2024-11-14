import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { I18nKeyPath } from '../../i18n/types';
import { CText } from '@components/CText';

interface ChoiceBoxUpdateSeizureProps {
  options: I18nKeyPath[];
  selectedOption: I18nKeyPath | null;
  onSelect: (selectedValue: I18nKeyPath) => void;
}

export const ChoiceBoxUpdateSeizure: React.FC<ChoiceBoxUpdateSeizureProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [selected, setSelected] = useState<I18nKeyPath | null>(null);

  const handlePress = (option: I18nKeyPath) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          style={[
            styles.option,
            selectedOption === option
              ? styles.selectedOption
              : styles.unselectedOption,
          ]}
        >
          <CText
            size="sm_medium"
            color={selected === option ? 'white' : 'purpleGrey'}
            text={option}
          />
        </TouchableOpacity>
      ))}
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

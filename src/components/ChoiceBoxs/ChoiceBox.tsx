import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { I18nKeyPath } from '../../i18n/types';
import { CText } from '@components/CText';

interface ChoiceBoxProps {
  options: I18nKeyPath[];
  onSelect: (value: I18nKeyPath) => void;
}

export const ChoiceBox: React.FC<ChoiceBoxProps> = ({ options, onSelect }) => {
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
          style={[
            styles.option,
            selected === option
              ? styles.selectedOption
              : styles.unselectedOption,
          ]}
          onPress={() => handlePress(option)}
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

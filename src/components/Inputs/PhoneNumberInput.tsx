import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Icon from 'react-native-easy-icon';
import { Colors } from '@constants/Colors';
import { CText } from '@components/CText';

interface CountryCodeDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const CountryCodeDropdown = ({
  options,
  onSelect,
}: CountryCodeDropdownProps) => {
  const [selectedCode, setSelectedCode] = useState<string | null>(options[0]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedCode(option);
    onSelect(option);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <CText style={styles.selectedOptionText}>{selectedCode}</CText>
        <Icon
          type="feather"
          name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={18}
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

interface PhoneNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: string[];
  verticalPadding: number;
  borderColor: string;
  backgroundColor: string;
  textStyle: object;
  onFocus: () => void;
  onBlur: () => void;
}

export const PhoneNumberInput = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  verticalPadding,
  borderColor,
  backgroundColor,
  textStyle,
  onFocus,
  onBlur,
}: PhoneNumberInputProps<TFieldValues>) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: {} }) => (
        <View
          style={[
            styles.phoneNumberContainer,
            { borderColor: borderColor, paddingVertical: verticalPadding },
          ]}
        >
          <CountryCodeDropdown options={options} onSelect={console.log} />
          <TextInput
            style={[styles.phoneNumberInput, { backgroundColor, ...textStyle }]}
            value={value || phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              onChange(text);
            }}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            onFocus={onFocus}
            onBlur={() => {
              onBlur();
              onChange(phoneNumber);
            }}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  selectedOptionText: {
    fontSize: 14,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey1,
    borderRadius: 4,
    width: 100,
    zIndex: 1000,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
  },
});

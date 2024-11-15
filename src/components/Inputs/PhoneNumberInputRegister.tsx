import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Icon from 'react-native-easy-icon';
import { Colors } from '@constants/Colors';
import { CText } from '@components/CText';

interface CountryCodeDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  selectedCode: string;
}

export const CountryCodeDropdown = ({
  options,
  onSelect,
  selectedCode,
}: CountryCodeDropdownProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <CText style={styles.selectedOptionText}>{selectedCode}</CText>
        <Icon
          type="feather"
          name={isModalVisible ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={Colors.fog}
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
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
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

interface PhoneNumberInputRegisterProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: string[];
  verticalPadding: number;
  borderColor: string;
  backgroundColor: string;
  textStyle: object;
  defaultCountryCode: string;
  onCountryCodeSelect?: (code: string) => void; // Make this optional with `?`
}

export const PhoneNumberInputRegister = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  verticalPadding,
  borderColor,
  backgroundColor,
  textStyle,
  defaultCountryCode,
  onCountryCodeSelect = () => {}, // Set a default empty function

}: PhoneNumberInputRegisterProps<TFieldValues>) => {
  const [countryCode, setCountryCode] = useState(defaultCountryCode);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryCodeSelect = (code: string) => {
    setCountryCode(code); // Update the selected country code
    onCountryCodeSelect(code); // Pass the selected code to RegisterScreen

  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View
          style={[
            styles.phoneNumberContainer,
            { borderColor, paddingVertical: verticalPadding },
          ]}
        >
          <CountryCodeDropdown
            options={options}
            selectedCode={countryCode}
            onSelect={handleCountryCodeSelect} // Set the selected country code in state
          />
          <TextInput
            style={[
              styles.PhoneNumberInputRegister,
              { backgroundColor, ...textStyle, fontSize: 14 },
            ]}
            value={value}
            onChangeText={(text) => {
              setPhoneNumber(text);
              onChange(text);
            }}
            placeholder="Enter your phone number"
            placeholderTextColor={Colors.grey5}
            keyboardType="phone-pad"
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.lightPink,
  },
  PhoneNumberInputRegister: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    fontSize: 14,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  selectedOptionText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: 300,
    padding: 20,
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
  },
});

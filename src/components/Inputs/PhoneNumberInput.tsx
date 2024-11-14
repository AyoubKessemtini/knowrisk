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
  defaultCode: string;
  onDropdownPress: () => void;
}

export const CountryCodeDropdown = ({
  options,
  onSelect,
  defaultCode,
  onDropdownPress,
}: CountryCodeDropdownProps) => {
  const [selectedCode, setSelectedCode] = useState<string>(defaultCode);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedCode(option);
    onSelect(option);
    setModalVisible(false);
  };

  const toggleModal = () => {
    onDropdownPress();
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setSelectedCode(defaultCode);
  }, [defaultCode]);

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
          onPress={() => setModalVisible(false)} // Close modal when overlay is clicked
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
  defaultCountryCode: string;
  onCountryCodeSelect: (code: string) => void;
  onDropdownPress: () => void;
}

export const PhoneNumberInput = <TFieldValues extends FieldValues>({
  control,
  
  name,
  options,
  verticalPadding,
  borderColor,
  backgroundColor,
  textStyle,
  defaultCountryCode,
  onCountryCodeSelect, // Pass down this prop to update parent component

  onDropdownPress,
}: PhoneNumberInputProps<TFieldValues>) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCode, setSelectedCode] = useState(defaultCountryCode);

  const handleCountryCodeSelect = (code: string) => {
    setSelectedCode(code); // Update local state
    if (onCountryCodeSelect) {
      onCountryCodeSelect(code); // Update parent state
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View
          style={[
            styles.phoneNumberContainer,
            { borderColor: borderColor, paddingVertical: verticalPadding },
          ]}
        >
          <CountryCodeDropdown
            options={options}
            onDropdownPress={onDropdownPress}
            defaultCode={defaultCountryCode}
            onSelect={handleCountryCodeSelect}

          />
          <TextInput
            style={[styles.phoneNumberInput, { backgroundColor, ...textStyle }]}
            value={value || phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              onChange(text);
            }}
            placeholder="Enter your phone number"
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

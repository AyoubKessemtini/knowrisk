import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientFormActions } from '@store/getPatientSlice';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editProfileScheme,
  EditProfileScheme,
} from '../../../../schemes/editProfile.scheme';
import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { BirthDateSelector } from '@components/DatePicker/BirthdayDatePicker';
import { DropdownSelector } from '@components/Dropdowns/DropdownSelector';
import { PhoneNumberInput } from '@components/Inputs/PhoneNumberInput';
import { I18nKeyPath } from '../../../../i18n/types';
import { Header } from '@components/Headers/Header';
import moment from 'moment';
import { ControlledInput } from '@components/ControlledInput';
import { RootState } from '@store/index';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { updateProfileActions } from '@store/updateProfilSlice';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native';
import { RootStackRoutes } from '@navigators/routes';

export const EditProfileScreen =
  ({}: RootStackScreenProps<'EditProfileScreen'>): JSX.Element => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [patientId, setPatientId] = useState<string | null>(null);
    const [defaultCountry, setDefaultCountry] = useState<I18nKeyPath | null>(
      null,
    );

    const {
      data: patient,
      loading,
      error,
    } = useSelector((state: RootState) => state.getPatientForm);
    const [isBloodTypePickerVisible, setBloodTypePickerVisible] =
      useState(false);
    const scrollViewRef = useRef<FlatList>(null); // Reference to the ScrollView
    const renderItem = ({ item }: { item: JSX.Element }) => item;

    const {
      successMessage,
      error: updateError,
      loading: updating,
    } = useSelector((state: RootState) => state.updateProfile);
    const {
      control,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm<EditProfileScheme>({
      defaultValues: {
        firstname: '',
        lastname: '',
        birthDate: '',
        email: '',
        sex: '',
        phoneNumber: '',
        height: 0,
        weight: 0,
        bloodType: '',
      },
      resolver: zodResolver(editProfileScheme),
    });

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [defaultCountryCode, setDefaultCountryCode] = useState<string | null>(
      null,
    );

    const countryCodes = ['+33', '+370', '+44', '+91', '+61', '+216'];
    const sexOptions: I18nKeyPath[] = [
      'profile.genders.male',
      'profile.genders.female',
      'profile.genders.other',
    ];

    // Map country code to I18nKeyPath
    const countryCodeToCountryKey = (code: string): I18nKeyPath => {
      switch (code) {
        case '+33':
          return 'profile.countries.fr';
        case '+370':
          return 'profile.countries.lt';
        case '+44':
          return 'profile.countries.uk';
        case '+61':
          return 'profile.countries.au';
        case '+216':
          return 'profile.countries.tn'; // Example for Tunisia
        default:
          return 'profile.countries.other';
      }
    };

    const countryOptions: I18nKeyPath[] = [
      'profile.countries.fr',
      'profile.countries.lt',
      'profile.countries.au',
      'profile.countries.tn',
      'profile.countries.uk',
      'profile.countries.other',
    ];

    const handleSelect = (option: string) => {
      console.log('Selected option:', option);
    };
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
      '+216', // Default or initial country code
    );
    useEffect(() => {
      if (successMessage) {
        Alert.alert('Success', successMessage);
        dispatch(updateProfileActions.updateProfileReset());
        navigation.navigate(RootStackRoutes.TAB_STACK, {
          screen: RootStackRoutes.HOME,
        });
      } else if (updateError) {
        Alert.alert('Error', updateError);
        dispatch(updateProfileActions.updateProfileReset());
      }
    }, [successMessage, updateError, dispatch]);
    useEffect(() => {
      const fetchPatientId = async () => {
        try {
          const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
          if (userData) {
            const user = JSON.parse(userData);
            setPatientId(user.id);
          }
        } catch (error) {
          console.error('Failed to fetch patient ID:', error);
        }
      };
      fetchPatientId();
    }, []);

    useFocusEffect(
      React.useCallback(() => {
        if (patientId) {
          dispatch(
            getPatientFormActions.submitgetPatientReportRequest({
              id: patientId,
            })
          );
        }
      }, [patientId, dispatch])
    );

    useEffect(() => {
      if (patient) {
        // Map patient data to form values
        const genderOption = mapGenderToOption(patient.gender);
        const countryCode = extractCountryCode(patient.phone);
        const initialCountry = countryCodeToCountryKey(countryCode);

        reset({
          firstname: patient.first_name || '',
          lastname: patient.last_name || '',
          birthDate: patient.birthday
            ? moment(patient.birthday).format('YYYY-MM-DD')
            : '',
          email: patient.email || '',
          sex: genderOption,
          bloodType: patient.blood_type || '',
          height: parseFloat(patient.height.toString()) || 0,
          weight: parseFloat(patient.weight.toString()) || 0,
          phoneNumber:
            patient.phone.replace(countryCode, '').replace(/-/g, '') || '',
        });

        setDefaultCountry(initialCountry); // Update UI state
        setDefaultCountryCode(countryCode);
        setSelectedCountryCode(countryCode || '+216');
        setSelectedDate(
          patient.birthday ? new Date(patient.birthday) : new Date(),
        );
        setValue('sex', genderOption); // Ensure sex is updated in the form state
        setValue('bloodType', patient.blood_type); // Ensure bloodType is updated in the form state
      }
    }, [patient, reset, setValue]);

    const scrollToTop = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    };
    const mapGenderToOption = (gender: string): I18nKeyPath => {
      switch (gender.toLowerCase()) {
        case 'male':
          return 'profile.genders.male';
        case 'female':
          return 'profile.genders.female';
        default:
          return 'profile.genders.other';
      }
    };

    const bloodTypes = [
      { label: 'A+', value: 'A+' },
      { label: 'A-', value: 'A-' },
      { label: 'B+', value: 'B+' },
      { label: 'B-', value: 'B-' },
      { label: 'AB+', value: 'AB+' },
      { label: 'AB-', value: 'AB-' },
      { label: 'O+', value: 'O+' },
      { label: 'O-', value: 'O-' },
      // { label: "I don't know", value: "I don't know" },
    ];

    const extractCountryCode = (phoneNumber: string): string => {
      // Remove any dashes from the input
      const formattedPhoneNumber = phoneNumber.replace(/-/g, '');

      for (const code of countryCodes) {
        if (formattedPhoneNumber.startsWith(code)) return code;
      }

      return ''; // default if no matching code
    };

    const onSubmit = (data: EditProfileScheme) => {
      try {
        console.log(
          'Submitted data:',
          data.sex === 'profile.genders.male' ? 'Male' : 'Female',
        );

        const fullPhoneNumber = `${selectedCountryCode}-${data.phoneNumber}`;
        console.log('Submitted country code:', selectedCountryCode);

        const sex = data.sex === 'profile.genders.male' ? 'Male' : 'Female';

        dispatch(
          updateProfileActions.updateProfileRequest({
            email: data.email,
            phone: fullPhoneNumber,
            birthday: data.birthDate,
            height: data.height, // Replace with actual form input if available
            weight: data.weight, // Replace with actual form input if available
            blood_type: data.bloodType, // Replace with actual form input if available
            gender: sex,
            first_name: data.firstname,
            last_name: data.lastname,
          }),
        );

        console.log('Profile update request dispatched successfully.');
      } catch (error) {
        console.error('Error during profile update submission:', error);
        // Optionally, you can show a user-friendly error message
        alert(
          'An error occurred while submitting the profile update. Please try again.',
        );
      }
    };

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.deepPurple} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <CText text={`Error: ${error}`} color="red" />
        </View>
      );
    }

    return (
      <Screen withoutTopEdge noHorizontalPadding>
        <Header
          hasBackButton
          text="profile.edit_profile"
          backgroundColor={Colors.lightPurple}
        />
        <View style={styles.scrollContainer} />

        <FlatList
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContentContainer}
          data={[
            <CText
              mt={10}
              color="grey3"
              size="sm_medium"
              text="onboarding.signup.first_name"
            />,
            <ControlledInput
              control={control}
              name="firstname"
              verticalPadding={10}
              borderColor={Colors.grey1}
              backgroundColor={Colors.white}
              textStyle={{ color: Colors.black, fontSize: 14 }}
              RightAccessory={() => (
                <Icon
                  name="person-outline"
                  size={21}
                  color={Colors.deepPurple}
                />
              )}
            />,

            <CText
              color="grey3"
              size="sm_medium"
              mt={10}
              text="onboarding.signup.last_name"
            />,
            <ControlledInput
              control={control}
              name="lastname"
              verticalPadding={10}
              borderColor={Colors.grey1}
              backgroundColor={Colors.white}
              textStyle={{ color: Colors.black, fontSize: 14 }}
              RightAccessory={() => (
                <Icon
                  name="person-outline"
                  size={21}
                  color={Colors.deepPurple}
                />
              )}
            />,

            <CText
              color="grey3"
              size="sm_medium"
              mt={10}
              text="onboarding.signup.birth_date"
            />,
            <BirthDateSelector
              initialDate={selectedDate}
              onDateChange={(newDate) => {
                setSelectedDate(newDate); // Update local state
                setValue('birthDate', moment(newDate).format('YYYY-MM-DD')); // Sync with form
              }}
              // onDateChange={(newDate) => setSelectedDate(newDate)}
            />,

            <CText color="grey3" size="sm_medium" mt={10} text="common.mail" />,
            <ControlledInput
              control={control}
              name="email"
              verticalPadding={10}
              borderColor={Colors.grey1}
              backgroundColor={Colors.white}
              textStyle={{ color: Colors.black, fontSize: 14 }}
              RightAccessory={() => (
                <Icon name="mail-outline" size={21} color={Colors.deepPurple} />
              )}
            />,

            <CText
              color="grey3"
              size="sm_medium"
              mt={10}
              text="onboarding.gender"
            />,
            sexOptions && (
              <Controller
                control={control}
                name="sex"
                render={({ field: { onChange, value } }) => (
                  <DropdownSelector
                    options={sexOptions}
                    defaultValue={value as I18nKeyPath}
                    onSelect={(option) => {
                      onChange(option);
                      handleSelect(option);
                    }}
                  />
                )}
              />
            ),

            <CText color="grey3" size="sm_medium" mt={10}>
              Height (cm)
            </CText>,
            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.inputContainer,
                    errors.height && styles.errorBorder, // Correct error check for height
                  ]}
                  keyboardType="numeric"
                  placeholder="Enter height in cm"
                  value={value?.toString() || ''}
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                />
              )}
            />,

            <CText color="grey3" size="sm_medium" mt={10}>
              Weight (kg)
            </CText>,
            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.inputContainer,
                    errors.weight && styles.errorBorder, // Correct error check for weight
                  ]}
                  keyboardType="numeric"
                  placeholder="Enter weight in kg"
                  value={value?.toString() || ''}
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                />
              )}
            />,
            <CText color="grey3" size="sm_medium" mt={10}>
              Blood Type
            </CText>,
            <Controller
              control={control}
              name="bloodType"
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setBloodTypePickerVisible(true)}
                  >
                    <Text style={styles.inputText}>
                      {value || 'Select blood type'}
                    </Text>
                  </TouchableOpacity>

                  <Modal
                    visible={isBloodTypePickerVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setBloodTypePickerVisible(false)}
                  >
                    <View style={styles.bottomModalContainer}>
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={value} // Displays the current form value in the picker
                          onValueChange={(itemValue) => {
                            onChange(itemValue); // Update form state with selected blood type
                            setBloodTypePickerVisible(false); // Close modal after selection
                          }}
                        >
                          {bloodTypes.map((type) => (
                            <Picker.Item
                              key={type.value}
                              label={type.label}
                              value={type.value}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </Modal>
                </>
              )}
            />,

            <CText
              color="grey3"
              size="sm_medium"
              mt={10}
              text="onboarding.signup.phone_number"
            />,
            <PhoneNumberInput
              control={control}
              name="phoneNumber"
              options={countryCodes}
              verticalPadding={10}
              borderColor={Colors.grey1}
              onDropdownPress={scrollToTop} // Pass scrollToTop function
              backgroundColor={Colors.white}
              textStyle={{ color: Colors.black, fontSize: 14 }}
              dropdownStyle={{ zIndex: 1000 }} // Ensure dropdown shows above other elements
              defaultCountryCode={defaultCountryCode}
              onCountryCodeSelect={setSelectedCountryCode}
            />,
            <CText color="grey3" size="sm_medium" mt={10} />,
            <CText color="grey3" size="sm_medium" mt={10} />,
            // <CText color="grey3" size="sm_medium" mt={10} text="" />,

            // <View style={styles.fixedButtonContainer}>
            //   <CButton
            //     mt={25}
            //     style={{ zIndex: 1 }}
            //     text="profile.save_changes"
            //     textSize="md_medium"
            //     onPress={handleSubmit(onSubmit)}
            //   />
            // </View>,
          ]}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          ListFooterComponent={
            <CButton
              text="profile.save_changes"
              textSize="md_medium"
              onPress={handleSubmit(onSubmit)}
            />
          }
        />
      </Screen>
    );
  };

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.grey1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 80, // Extra padding at the bottom for scrolling above the button
  },
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderColor: Colors.grey1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  errorBorder: {
    borderColor: 'red',
  },
  inputText: {
    fontSize: 16,
    color: Colors.deepPurple,
  },
});

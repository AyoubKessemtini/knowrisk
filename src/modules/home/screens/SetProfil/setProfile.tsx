import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Removed DateTimePicker import
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { onboardingValidationSchema } from './setProfileSchema';
import { Colors } from '@constants/Colors';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileActions } from '@store/profileSlice';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { BirthDateSelector } from '@components/DatePicker/BirthdayDatePicker';
// Import BirthDateSelector

type FormData = {
  birthday: string;
  height: number;
  weight: number;
  gender: string;
  bloodType: string;
};

const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const bloodTypes = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
  { label: "I don't know", value: "I don't know" },
  
];

const { width } = Dimensions.get('window');

const SetProfilFormScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, errorProfile, profileData } = useSelector(
    (state: RootState) => state.profile,
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (successMessage) {
      Alert.alert('Success', successMessage, [
        {
          text: 'OK',
          onPress: () => navigation.navigate(RootStackRoutes.Gif_INTRO),

          // navigation.navigate(RootStackRoutes.TAB_STACK, {
          //   screen: RootStackRoutes.HOME,
          // }),
        },
      ]);
    } else if (errorProfile) {
      Alert.alert('Error', errorProfile, [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate(RootStackRoutes.TAB_STACK, {
              screen: RootStackRoutes.HOME,
            }),
        },
      ]);
    }
  }, [successMessage, errorProfile]);

  const onSubmit = (data: FormData) => {
    const payload = {
      ...profileData, // Include data from Question1
      birthday: data.birthday,
      height: Number(data.height),
      weight: Number(data.weight),
      blood_type: data.bloodType,
      gender: data.gender,
    };

    dispatch(ProfileActions.resetProfileErrors());
    dispatch(ProfileActions.setProfileRequest(payload));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(onboardingValidationSchema),
  });

  // Removed unnecessary state hooks
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<string>('');
  const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);
  const [isBloodTypePickerVisible, setBloodTypePickerVisible] = useState(false);

  // Removed onDateChange function
  // const onDateChange = (event: any, date?: Date) => { ... };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { onChange, value } }) => (
              <BirthDateSelector
                initialDate={value ? new Date(value) : new Date()}
                onDateChange={(newDate) => {
                  const formattedDate = newDate.toISOString().split('T')[0];
                  onChange(formattedDate);
                  setValue('birthday', formattedDate);
                }}
              />
            )}
          />
          {errors.birthday && (
            <Text style={styles.errorText}>{errors.birthday.message}</Text>
          )}

          {/* Rest of your form fields remain unchanged */}

          <Text style={styles.label}>Height (cm)</Text>
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputContainer}
                placeholder="Enter height in cm"
                keyboardType="numeric"
                value={value ? value.toString() : ''}
                onChangeText={(val) => onChange(Number(val))}
              />
            )}
          />
          {errors.height && (
            <Text style={styles.errorText}>{errors.height.message}</Text>
          )}

          <Text style={styles.label}>Weight (kg)</Text>
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputContainer}
                placeholder="Enter weight in kg"
                keyboardType="numeric"
                value={value ? value.toString() : ''}
                onChangeText={(val) => onChange(Number(val))}
              />
            )}
          />
          {errors.weight && (
            <Text style={styles.errorText}>{errors.weight.message}</Text>
          )}

          <Text style={styles.label}>Gender</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setGenderPickerVisible(true)}
              >
                <Text style={styles.inputText}>{value || 'Select gender'}</Text>
              </TouchableOpacity>
            )}
          />
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender.message}</Text>
          )}

          <Modal
            visible={isGenderPickerVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setGenderPickerVisible(false)}
          >
            <View style={styles.bottomModalContainer}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={profileData.gender}
                  onValueChange={(itemValue) => {
                    setValue('gender', itemValue);
                    setGenderPickerVisible(false);
                  }}
                >
                  {genderOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>

          <Text style={styles.label}>Blood Type</Text>
          <Controller
            control={control}
            name="bloodType"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setBloodTypePickerVisible(true)}
              >
                <Text style={styles.inputText}>
                  {value || 'Select blood type'}
                </Text>
              </TouchableOpacity>
            )}
          />
          {errors.bloodType && (
            <Text style={styles.errorText}>{errors.bloodType.message}</Text>
          )}

          <Modal
            visible={isBloodTypePickerVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setBloodTypePickerVisible(false)}
          >
            <View style={styles.bottomModalContainer}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={profileData.blood_type}
                  onValueChange={(itemValue) => {
                    setValue('bloodType', itemValue);
                    setBloodTypePickerVisible(false);
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

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.grey3,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderColor: Colors.grey1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: Colors.lightPink,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    color: Colors.deepPurple,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    width: '100%',
    backgroundColor: Colors.deepPurple,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.grey1,
  },
});

export default SetProfilFormScreen;

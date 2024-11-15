import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
  Modal,
  Switch,
} from 'react-native';
import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { registerScheme, RegisterScheme } from 'src/schemes/register.scheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { BackButton } from '@components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { AuthActions } from '@store/authSlice';
import { Colors } from '@constants/Colors';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DeviceType } from '@constants/DeviceTypes';
import { PhoneNumberInputRegister } from '@components/Inputs/PhoneNumberInputRegister';
 
export const RegisterScreen =
  ({}: OnboardingStackScreenProps<'SignUpScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { control, handleSubmit } = useForm<RegisterScheme>({
      defaultValues: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        device_type: DeviceType.Device,
        acceptedTerms: false,
      },
      resolver: zodResolver(registerScheme),
    });

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
    const [isSecureEnabled, setSecureEnabled] = useState(true); // State to handle password visibility
    const [isSecureConfirmEnabled, setSecureConfirmEnabled] = useState(true); // State to handle password visibility

    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };
    const [selectedCountryCode, setSelectedCountryCode] = useState('+216'); // Default country code

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };
    const [selectedDeviceType, setSelectedDeviceType] = useState<
      DeviceType | ''
    >('');

    const [isPickerVisible, setPickerVisible] = useState(false); // State for dropdown

    const onSubmit = (data: RegisterScheme) => {
      try {
        // Your existing logic

        const fullPhoneNumber = `${selectedCountryCode}${data.phoneNumber}`;
        console.log('Dispatching register eeee:' + fullPhoneNumber);
        dispatch(AuthActions.resetErrorRegister()); // Reset error before submitting

        const payload = {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          password: data.password,
          confirmpassword: data.confirmPassword,
          phone: fullPhoneNumber,
          device_type: selectedDeviceType, // Include selected device type
        };
        console.log('Dispatching register request:', payload); // Debug: Check payload data

        dispatch(AuthActions.registerRequest(payload));
        // eslint-disable-next-line no-catch-shadow
      } catch (error) {
        console.error('Submission error:', error);
        Alert.alert('An error occurred', 'Please try again.');
      }
    };

    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.errorRegister);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    // Reset error on component mount
    useEffect(() => {
      dispatch(AuthActions.resetErrorRegister()); // Reset error when component mounts
      return () => {
        dispatch(AuthActions.resetErrorRegister()); // Reset on unmount
      };
    }, [dispatch]);

    // Handle error alerts
    useEffect(() => {
      if (error) {
        Alert.alert('Registration Failed', error, [
          {
            text: 'OK',
            onPress: () => {
              // Reset the error after displaying it
              dispatch(AuthActions.resetErrorRegister());
            },
          },
        ]);
      }
    }, [error, dispatch]);

    // Navigate on successful registration
    useEffect(() => {
      if (isLoggedIn) {
        navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
          screen: OnboardingStackRoutes.INTRO_QUESTION_SCREEN,
        });
        dispatch(AuthActions.resetRegisterSuccess());
      }
    }, [isLoggedIn]);
    const togglePasswordConfirmVisibility = () => {
      setSecureConfirmEnabled(!isSecureConfirmEnabled);
    };
    const togglePasswordVisibility = () => {
      setSecureEnabled(!isSecureEnabled);
    };
    const countryCodes = ['+33', '+370', '+44', '+91', '+61', '+216'];
    const scrollToTop = () => {};
    return (
      <Screen fullscreen containerStyles={styles.container}>
        <View style={{ width: 35 }}>
          <BackButton />
        </View>
        <CText
          text="onboarding.signup.register_account"
          size="xl_medium"
          color="darkPurple"
        />
        <CText
          text="onboarding.signup.register_account"
          size="lg_medium"
          color="grey3"
        />
        <ControlledInput
          placeholderText="onboarding.signup.first_name"
          placeholderColor={Colors.grey5}
          control={control}
          name="firstname"
          borderColor={isFocused.firstname ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('firstname')}
          onBlur={() => handleBlur('firstname')}
          RightAccessory={() => (
            <Icon name="person-outline" size={20} color={Colors.deepPurple} />
          )}
        />
        <ControlledInput
          placeholderText="onboarding.signup.last_name"
          placeholderColor={Colors.grey5}
          control={control}
          name="lastname"
          borderColor={isFocused.lastname ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('lastname')}
          onBlur={() => handleBlur('lastname')}
          RightAccessory={() => (
            <Icon name="person-outline" size={20} color={Colors.deepPurple} />
          )}
        />
        <ControlledInput
          placeholderText="onboarding.signup.email_placeholder"
          placeholderColor={Colors.grey5}
          control={control}
          name="email"
          borderColor={isFocused.email ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
          RightAccessory={() => (
            <Icon name="mail-outline" size={20} color={Colors.deepPurple} />
          )}
        />
        {/* <ControlledInput
          placeholderText="onboarding.signup.phone_number"
          placeholderColor={Colors.grey5}
          control={control}
          name="phoneNumber"
          borderColor={isFocused.phoneNumber ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          onFocus={() => handleFocus('phoneNumber')}
          onBlur={() => handleBlur('phoneNumber')}
          RightAccessory={() => (
            <Icon name="call-outline" size={20} color={Colors.deepPurple} />
          )}
        /> */}
        {/* <PhoneNumberInputRegister
          control={control}
          placeholderText="onboarding.signup.phone_number"
          name="phoneNumber"
          options={countryCodes}
          verticalPadding={10}
          borderColor={isFocused.phoneNumber ? Colors.deepPurple : Colors.grey1}
          placeholderColor={Colors.grey5}
          backgroundColor={Colors.white}
          textStyle={{ color: Colors.deepPurple }}
          dropdownStyle={{ zIndex: 1000 }}
          defaultCountryCode={selectedCountryCode}
          onCountryCodeSelect={(code) => setSelectedCountryCode(code)} // Callback to set selected country code
        /> */}
        <PhoneNumberInputRegister
          control={control}
          name="phoneNumber"
          options={countryCodes}
          verticalPadding={10}
          borderColor={isFocused.phoneNumber ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          textStyle={{ color: Colors.deepPurple }}
          defaultCountryCode={selectedCountryCode}
          placeholderText="onboarding.signup.phone_number"
          onCountryCodeSelect={(code) => setSelectedCountryCode(code)} // Update state in RegisterScreen
        />
        <ControlledInput
          control={control}
          secureTextEntry={isSecureEnabled} // Use state to control visibility
          placeholderText="onboarding.password"
          placeholderColor={Colors.grey5}
          name="password"
          borderColor={isFocused.password ? Colors.deepPurple : Colors.grey1}
          backgroundColor={Colors.lightPink}
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
          RightAccessory={() => (
            <Pressable onPress={togglePasswordVisibility}>
              <AntDesign
                name={isSecureEnabled ? 'eyeo' : 'eye'} // Change icon based on visibility
                size={20}
                color={Colors.deepPurple}
              />
            </Pressable>
          )}
        />
        <ControlledInput
          control={control}
          secureTextEntry={isSecureConfirmEnabled} // Use state to control visibility
          placeholderText="profile.confirm_password"
          placeholderColor={Colors.grey5}
          name="confirmPassword"
          borderColor={
            isFocused.confirmPassword ? Colors.deepPurple : Colors.grey1
          }
          backgroundColor={Colors.lightPink}
          onFocus={() => handleFocus('confirmPassword')}
          onBlur={() => handleBlur('confirmPassword')}
          RightAccessory={() => (
            <Pressable onPress={togglePasswordConfirmVisibility}>
              <AntDesign
                name={isSecureConfirmEnabled ? 'eyeo' : 'eye'} // Change icon based on visibility
                size={20}
                color={Colors.deepPurple}
              />
            </Pressable>
          )}
        />
        {/* Dropdown for device selection using enum */}
        <TouchableOpacity
          style={[
            styles.pickerButton,
            {
              borderColor: isFocused.deviceType
                ? Colors.deepPurple
                : Colors.grey1,
              backgroundColor: Colors.lightPink,
            },
          ]}
          onPress={() => setPickerVisible(true)}
          onFocus={() => handleFocus('deviceType')}
          onBlur={() => handleBlur('deviceType')}
        >
          <CText
            size="md_bold"
            color={selectedDeviceType ? 'deepPurple' : 'grey3'}
          >
            {selectedDeviceType || 'Select Device Type'}
          </CText>
        </TouchableOpacity>
        <Modal
          visible={isPickerVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setPickerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View
              style={[styles.pickerContainer, { borderColor: Colors.grey1 }]}
            >
              <Picker
                selectedValue={selectedDeviceType}
                onValueChange={(itemValue) => {
                  setSelectedDeviceType(itemValue as DeviceType);
                  setPickerVisible(false);
                }}
              >
                <Picker.Item label="Select Device Type" value="" />
                <Picker.Item
                  label={DeviceType.Device}
                  value={DeviceType.Device}
                />
                <Picker.Item
                  label={DeviceType.Fitbit}
                  value={DeviceType.Fitbit}
                />
                <Picker.Item
                  label={DeviceType.Apple}
                  value={DeviceType.Apple}
                />
              </Picker>
            </View>
          </View>
        </Modal>
        {/* <CButton
          mt={20}
          text="common.continue"
          onPress={() =>
            navigation.navigate(RootStackRoutes.SetProfil_FormScreen)
          }
        /> */}
        <Controller
          control={control}
          name="acceptedTerms"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.switchContainer}>
              <View
                style={[
                  styles.switchWrapper,
                  error && styles.switchWrapperError, // Apply error style if there's an error
                ]}
              >
                <Switch
                  value={value}
                  onValueChange={(val: boolean) => onChange(val)}
                  thumbColor={value ? Colors.deepPurple : Colors.grey3}
                  trackColor={{ false: Colors.grey1, true: Colors.lightPurple }}
                />
              </View>

              <View style={styles.switchTextContainer}>
                <CText style={styles.label}>
                  I have read and accepted the{' '}
                </CText>
                <Pressable
                  onPress={() => {
                    // Navigate to Terms and Conditions screen
                    navigation.navigate(
                      RootStackRoutes.TERMS_CONDITIONS_PROFIL,
                    );
                  }}
                >
                  <CText style={styles.link}>terms and conditions</CText>
                </Pressable>
              </View>
            </View>
          )}
        />

        <CButton
          mt={20}
          text="common.continue"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <CText isCentered size="md">
          <CText
            text="onboarding.signup.already_have_account"
            color="black"
            size="md"
            mb={30}
          />

          <Pressable
            onPress={() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.LOGIN_SCREEN,
              });
            }}
          >
            <CText size="md_bold" color="deepPurple" text="onboarding.login" />
          </Pressable>
        </CText>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingVertical: 50,
  },
  pickerButton: {
    backgroundColor: Colors.lightPink,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1, // Adds border width to match `ControlledInput`
    marginVertical: 10,
  },
  selectedValueText: {
    fontSize: 16, // Matching font size with ControlledInput
    color: Colors.deepPurple,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1, // Border width to match ControlledInput
  },
  label: {
    color: Colors.black,
    fontSize: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  switchWrapper: {
    padding: 2,
    borderRadius: 4,
  },
  switchWrapperError: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default RegisterScreen;

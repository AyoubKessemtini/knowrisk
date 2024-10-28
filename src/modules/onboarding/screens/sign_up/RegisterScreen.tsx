import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerScheme, RegisterScheme } from 'src/schemes/register.scheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { BackButton } from '@components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '@store/authSlice';
import { Colors } from '@constants/Colors';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootState} from "@store/index.ts";

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
      },
      resolver: zodResolver(registerScheme),
    });

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
    const [isSecureEnabled, setSecureEnabled] = useState(true); // State to handle password visibility
    const [isSecureConfirmEnabled, setSecureConfirmEnabled] = useState(true); // State to handle password visibility

    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };

    const onSubmit = (data: RegisterScheme) => {
      dispatch(AuthActions.resetErrorRegister()); // Reset error before submitting

      const payload = {
        first_name: data.firstname,
        last_name: data.lastname,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmPassword,
        phone: data.phoneNumber,
      };
      dispatch(AuthActions.registerRequest(payload));
    };

    const loading = useSelector((state:RootState) => state.auth.loading);
    const error = useSelector((state:RootState) => state.auth.errorRegister);
    const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);
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
      }
    }, [isLoggedIn]);
    const togglePasswordConfirmVisibility = () => {
      setSecureConfirmEnabled(!isSecureConfirmEnabled);
    };
    const togglePasswordVisibility = () => {
      setSecureEnabled(!isSecureEnabled);
    };

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

        <ControlledInput
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

        <CButton
          mt={50}
          text="common.continue"
          onPress={handleSubmit(onSubmit)}
          //loading={loading}
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
});

export default RegisterScreen;

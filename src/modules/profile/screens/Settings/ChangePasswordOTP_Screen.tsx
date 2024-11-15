// ChangePasswordOTPScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@components/Headers/Header';

import { Screen } from '@components/Screen';
import { ControlledInput } from '@components/ControlledInput';
import { CButton } from '@components/Buttons/CButton';
import { Colors } from '@constants/Colors';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { RootStackRoutes, OnboardingStackRoutes } from '@navigators/routes';
import {
  changepasswordotpScheme,
  ChangepasswordotpScheme,
} from 'src/schemes/passwordotp.scheme';
import { forgetPasswordOTPActions } from '@store/forgetPasswordOTPSlice';
import { RootState } from '@store/index';

export const ChangePasswordOTPScreen =
  ({}: RootStackScreenProps<'ChangePasswordOTPScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isSecureEnabled, setSecureEnabled] = useState(true); // State to handle password visibility
    const [isSecureConfirmEnabled, setSecureConfirmEnabled] = useState(true); // State to handle password visibility

    const togglePasswordConfirmVisibility = () => {
      setSecureConfirmEnabled(!isSecureConfirmEnabled);
    };
    const togglePasswordVisibility = () => {
      setSecureEnabled(!isSecureEnabled);
    };
    const { control, handleSubmit } = useForm<ChangepasswordotpScheme>({
      defaultValues: {
        password: '',
        newPassword: '',
        confirmPassword: '',
      },
      resolver: zodResolver(changepasswordotpScheme),
    });

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});

    const { loading, error, successMessage } = useSelector(
      (state: RootState) => state.forgetPasswordOTP,
    );

    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };

    const onSubmit = (data: ChangepasswordotpScheme) => {
      dispatch(forgetPasswordOTPActions.forgetPasswordOTPReset()); // Reset error before submitting

      dispatch(
        forgetPasswordOTPActions.forgetPasswordOTPRequest({
          otp: data.password,
          password: data.newPassword,
        }),
      );
    };

    useFocusEffect(
      React.useCallback(() => {
        dispatch(forgetPasswordOTPActions.forgetPasswordOTPReset());
      }, [dispatch]),
    );

    useEffect(() => {
      if (successMessage) {
        Alert.alert('Success', successMessage, [
          {
            text: 'OK',
            onPress: () => {
              dispatch(forgetPasswordOTPActions.forgetPasswordOTPReset());
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.LOGIN_SCREEN,
              });
            },
          },
        ]);
      }
      if (error) {
        Alert.alert('Error', error, [
          {
            text: 'OK',
            onPress: () => {
              dispatch(forgetPasswordOTPActions.forgetPasswordOTPReset());
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.LOGIN_SCREEN,
              });
            },
          },
        ]);
      }
    }, [successMessage, error, dispatch, navigation]);

    return (
      <Screen withoutTopEdge noHorizontalPadding>
        <Header
          hasBackButton
          text="profile.change_password"
          backgroundColor={Colors.lightPurple}
        />
        <View style={styles.line} />
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <ControlledInput
              control={control}
              placeholderText="onboarding.otp"
              placeholderColor={Colors.black}
              keyboardType="number-pad"
              name="password"
              borderColor={isFocused.otp ? Colors.deepPurple : Colors.grey1}
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
              onFocus={() => handleFocus('otp')}
              onBlur={() => handleBlur('otp')}
              RightAccessory={() => (
                <AntDesign name="lock1" size={21} color={Colors.deepPurple} />
              )}
            />
            <ControlledInput
              control={control}
              secureTextEntry={isSecureEnabled}
              placeholderText="profile.new_password"
              placeholderColor={Colors.black}
              name="newPassword"
              borderColor={
                isFocused.newPassword ? Colors.deepPurple : Colors.grey1
              }
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
              onFocus={() => handleFocus('newPassword')}
              onBlur={() => handleBlur('newPassword')}
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
              secureTextEntry={isSecureEnabled}
              placeholderText="profile.confirm_password"
              placeholderColor={Colors.black}
              name="confirmPassword"
              borderColor={
                isFocused.confirmPassword ? Colors.deepPurple : Colors.grey1
              }
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
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
              mt={12}
              text="profile.save_changes"
              textSize="md_medium"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            />
            {loading && (
              <ActivityIndicator
                size="large"
                color={Colors.deepPurple}
                style={styles.loadingIndicator}
              />
            )}
          </View>
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    gap: 15,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderColor: Colors.fog,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

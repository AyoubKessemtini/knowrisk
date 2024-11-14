import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View, Alert, Pressable } from 'react-native';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePasswordScheme,
  ChangePasswordScheme,
} from '../../../../schemes/password.scheme';
import { Header } from '@components/Headers/Header';
import { changePasswordActions } from '@store/changePasswordSlice';
import { RootState } from '@store/index';

export const ChangePasswordScreen =
  ({}: RootStackScreenProps<'ChangePasswordScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm<ChangePasswordScheme>({
      defaultValues: {
        password: '',
        newPassword: '',
        confirmPassword: '',
      },
      resolver: zodResolver(changePasswordScheme),
    });

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});
    const { loading, successMessage, error } = useSelector(
      (state: RootState) => state.changePassword,
    );

    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };

    // Reset messages on page load and unmount
    useEffect(() => {
      dispatch(changePasswordActions.changePasswordReset());
    }, [dispatch]);

    // Show success or error alert when message changes
    useEffect(() => {
      if (successMessage) {
        Alert.alert('Success', successMessage, [{ text: 'OK' }]);
        dispatch(changePasswordActions.changePasswordReset());
      } else if (error) {
        Alert.alert('Error', error, [{ text: 'OK' }]);
        dispatch(changePasswordActions.changePasswordReset());
      }
    }, [successMessage, error, dispatch]);

    const onSubmit = (data: ChangePasswordScheme) => {
      console.log('Data:', {
        oldPassword: data.password,
        password: data.newPassword,
      });
      dispatch(
        changePasswordActions.changePasswordRequest({
          oldPassword: data.password,
          password: data.newPassword,
        }),
      );
    };
    const [isSecureEnabledold, setSecureEnabledold] = useState(true); // State to handle password visibility

    const [isSecureEnabled, setSecureEnabled] = useState(true); // State to handle password visibility
    const [isSecureConfirmEnabled, setSecureConfirmEnabled] = useState(true); // State to handle password visibility
    const togglePasswordoldVisibility = () => {
      setSecureEnabledold(!isSecureEnabledold);
    };
    const togglePasswordConfirmVisibility = () => {
      setSecureConfirmEnabled(!isSecureConfirmEnabled);
    };
    const togglePasswordVisibility = () => {
      setSecureEnabled(!isSecureEnabled);
    };
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
              secureTextEntry={isSecureEnabledold}
              placeholderText="profile.change_password"
              placeholderColor={Colors.black}
              name="password"
              borderColor={
                isFocused.oldPassword ? Colors.deepPurple : Colors.grey1
              }
              backgroundColor={Colors.white}
              textStyle={{
                color: Colors.black,
                fontWeight: 'normal',
                fontSize: 14,
              }}
              onFocus={() => handleFocus('oldPassword')}
              onBlur={() => handleBlur('oldPassword')}
              RightAccessory={() => (
                <Pressable onPress={togglePasswordoldVisibility}>
                  <AntDesign
                    name={isSecureEnabledold ? 'eyeo' : 'eye'} // Change icon based on visibility
                    size={20}
                    color={Colors.deepPurple}
                  />
                </Pressable>
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
              secureTextEntry={isSecureConfirmEnabled}
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
              loading={loading}
              onPress={handleSubmit(onSubmit)}
            />
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
});

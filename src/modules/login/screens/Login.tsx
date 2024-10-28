import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { LoginScheme, loginScheme } from '../../../schemes/login.scheme';
import { PassTextInput } from '@components/Inputs/Pass-Text-Input';
import { CText } from '@components/CText';
import ImageAssets from '@assets/images';
import { Colors } from '@constants/Colors';
import { useNavigation } from '@react-navigation/native';

import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { AuthActions } from '@store/authSlice';
import {
  OnboardingStackRoutes,
  RootStackRoutes,
  TabBarStackRoutes,
} from '@navigators/routes';

export const LoginScreen = ({}: OnboardingStackScreenProps<'LoginScreen'>) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<LoginScheme>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginScheme),
  });

  const onPressHandler = (formData: LoginScheme) => {
    dispatch(AuthActions.resetErrorLogin()); // Reset error before submitting

    dispatch(AuthActions.loginRequest(formData)); // Dispatch login request
  };

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.errorLogin);

 
  useEffect(() => {
    dispatch(AuthActions.resetErrorLogin()); // Reset error when component mounts
    return () => {
      dispatch(AuthActions.resetErrorLogin()); // Reset on unmount
    };
  }, [dispatch]);

  // Handle error alerts
  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(AuthActions.resetErrorLogin()); // Reset error after displaying it
          },
        },
      ]);
    }
  }, [error, dispatch]);
  // Handle error alerts

  return (
    <ImageBackground source={ImageAssets.LOGIN_BG} style={styles.container}>
      <View style={styles.flexed} />
      <CText
        mt={38}
        text="onboarding.login_description"
        color="white"
        size="xl_bold"
      />
      <CText mt={5} text="onboarding.login_to" color="white" size="md_medium" />
      <CText mt={15} text="onboarding.email_address" color="white" size="md" />
      <ControlledInput
        placeholderText="common.mail"
        placeholderTextColor={Colors.grey2}
        control={control}
        name="email"
        borderColor="white"
        backgroundColor={Colors.lightPink}
        textStyle={{ color: Colors.deepPurple }}
      />
      <CText mt={15} text="onboarding.password" color="white" size="md" />

      <PassTextInput name="password" control={control} />
      <CButton
        mt={15}
        buttonType="primary"
        text="onboarding.login"
        loading={loading}
        onPress={handleSubmit(onPressHandler)}
      />
      <Pressable
        onPress={() => {
          navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
            screen: OnboardingStackRoutes.FORGOT_PASSWORD_SCREEN,
          });
        }}
      >
        <CText
          isCentered
          text="onboarding.forgotPass"
          color="deepPurple"
          size="md"
          mt={10}
        />
      </Pressable>
      <CText isCentered size="md">
        <CText text="onboarding.not_member" color="white" size="md" mb={30} />
        <Pressable
          onPress={() => {
            navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
              screen: OnboardingStackRoutes.SIGNUP_SCREEN,
            });
          }}
        >
          <CText text="onboarding.register" color="deepPurple" size="md" />
        </Pressable>
      </CText>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: 5, paddingTop: 300, paddingHorizontal: 20 },

  flexed: { gap: 12 },
});

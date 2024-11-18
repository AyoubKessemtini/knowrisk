import React, { useEffect } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { PassTextInput } from '@components/Inputs/Pass-Text-Input';
import { CText } from '@components/CText';
import { LoginScheme, loginScheme } from '../../../schemes/login.scheme';
import ImageAssets from '@assets/images';
import { Colors } from '@constants/Colors';
import { AuthActions } from '@store/authSlice';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { RootState } from '@store/index.ts';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator.tsx';

export const LoginScreen = ({}: OnboardingStackScreenProps<'LoginScreen'>) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<LoginScheme>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginScheme),
  });

  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.errorLogin);

  useEffect(() => {
    dispatch(AuthActions.resetErrorLogin());
    return () => {
      dispatch(AuthActions.resetErrorLogin());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        {
          text: 'OK',
          onPress: () => dispatch(AuthActions.resetErrorLogin()),
        },
      ]);
    }
  }, [error, dispatch]);

  const onPressHandler = (formData: LoginScheme) => {
    dispatch(AuthActions.resetErrorLogin());
    dispatch(AuthActions.loginRequest(formData));
  };

  return (
    <ImageBackground source={ImageAssets.LOGIN_BG} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.flexed} />
          <CText
            mt={38}
            text="onboarding.login_description"
            color="white"
            size="xl_bold"
          />
          <CText
            mt={5}
            text="onboarding.login_to"
            color="white"
            size="md_medium"
          />
          <CText
            mt={15}
            text="onboarding.email_address"
            color="white"
            size="md"
          />
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
            onPress={handleSubmit(onPressHandler)}
          />
          <Pressable
            onPress={() =>
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.FORGOT_PASSWORD_SCREEN,
              })
            }
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
            <CText
              text="onboarding.not_member"
              color="white"
              size="md"
              mb={30}
            />
            <Pressable
              onPress={() =>
                navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                  screen: OnboardingStackRoutes.SIGNUP_SCREEN,
                })
              }
            >
              <CText text="onboarding.register" color="deepPurple" size="md" />
            </Pressable>
          </CText>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 300,
    paddingHorizontal: 20,
    gap: 15,
  },
  flexed: {
    gap: 12,
  },
});

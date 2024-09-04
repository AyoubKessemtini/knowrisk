import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { LoginScheme, loginScheme } from '../../../schemes/login.scheme';
import { PassTextInput } from '@components/Inputs/Pass-Text-Input';
import { Screen } from '@components/Screen';
import { useLoginWithEmailMutation } from '@query/queries/auth/authMutations';
import { CText } from '@components/CText';

export const LoginScreen = ({}: OnboardingStackScreenProps<'LoginScreen'>) => {
  const { mutate: loginWithEmailMutate } = useLoginWithEmailMutation();
  const { control, handleSubmit } = useForm<LoginScheme>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginScheme),
  });

  const onPressHandler = (formData: LoginScheme) => {
    loginWithEmailMutate(formData, {
      onError: (error) => {
        console.log(error);
        // setError('email');
        // setError('password');
      },
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };

  return (
    <Screen containerStyles={styles.container}>
      <View style={styles.flexed}>
        <CText>E-Mail</CText>
        <ControlledInput
          placeholderText="common.mail"
          control={control}
          name="email"
          //   LeftAccessory={({ state }: { state: string }) => (
          //     <Icon
          //       type="simple-line-icon"
          //       name="lock"
          //       size={24}
          //       color={state === 'focused' ? Colors.deepPurple : Colors.orange}
          //     />
          //   )}
        />
        <CText>Password</CText>
        <PassTextInput name="password" control={control} />
        <CButton
          onPress={() => {}}
          mt={12}
          buttonType="secondary"
          text="onboarding.forgotPass"
        />
      </View>
      {/* <View style={styles.providersWrapper}>
        <ProviderButton
          onPress={() => googleAuthHandler({ isRegistration: false })}
          provider="google"
        />
        {IS_IOS && (
          <ProviderButton
            onPress={() => appleAuthHandler({ isRegistration: false })}
            provider="apple"
          />
        )}
      </View> */}

      <CButton
        buttonType="secondary"
        text="onboarding.dontHaveAccount"
        onPress={() => {}}
      />
      <CButton
        buttonType="primary"
        text="common.connect"
        onPress={handleSubmit(onPressHandler)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, paddingTop: 50 },
  flexed: { flex: 1, gap: 12 },
});

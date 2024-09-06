import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { LoginScheme, loginScheme } from '../../../schemes/login.scheme';
import { PassTextInput } from '@components/Inputs/Pass-Text-Input';
import { useLoginWithEmailMutation } from '@query/queries/auth/authMutations';
import { CText } from '@components/CText';
import ImageAssets from '@assets/images';
import { Colors } from '@constants/Colors';

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
    <ImageBackground source={ImageAssets.LOGIN_BG} style={styles.container}>
      <View style={styles.flexed}></View>
      <CText text="onboarding.login_description" color="white" size="xl_bold" />
      <CText text="onboarding.login_to" color="white" size="lg_bold" />
      <CText text="onboarding.email_address" color="white" size="md" />
      <ControlledInput
        placeholderText="common.mail"
        control={control}
        name="email"
        borderColor="white"
        backgroundColor={Colors.lightPink}
        textStyle={{ color: Colors.deepPurple }}
        //   LeftAccessory={({ state }: { state: string }) => (
        //     <Icon
        //       type="simple-line-icon"
        //       name="lock"
        //       size={24}
        //       color={state === 'focused' ? Colors.deepPurple : Colors.orange}
        //     />
        //   )}
      />
      <CText text="onboarding.password" color="white" size="md" />
      <PassTextInput name="password" control={control} />
      <CButton
        buttonType="primary"
        text="common.connect"
        onPress={handleSubmit(onPressHandler)}
      />
      <CText
        isCentered
        text="onboarding.forgotPass"
        color="deepPurple"
        size="md"
        mt={10}
      />
      <CText isCentered size="md">
        <CText text="onboarding.not_member" color="white" size="md" mb={30} />
        <CText text="onboarding.register" color="deepPurple" size="md" />
      </CText>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, paddingTop: 300, paddingHorizontal: 20 },

  flexed: { gap: 12 },
});

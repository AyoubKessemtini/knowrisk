import { CButton } from '@components/Buttons/CButton';
import { ControlledInput } from '@components/ControlledInput';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackRoutes } from '@navigators/routes';
import { emailScheme, EmailScheme } from '../../../../schemes/email.scheme';
import { Header } from '@components/Headers/Header';

export const ForgotPasswordScreen =
  ({}: OnboardingStackScreenProps<'ForgotPasswordScreen'>): JSX.Element => {
    const navigation = useNavigation();
    const { control, handleSubmit } = useForm<EmailScheme>({
      defaultValues: {
        email: '',
      },
      resolver: zodResolver(emailScheme),
    });

    const [isFocused, setIsFocused] = useState<{ [key: string]: boolean }>({});

    const handleFocus = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name: string) => {
      setIsFocused((prev) => ({ ...prev, [name]: false }));
    };

    return (
      <Screen withoutTopEdge noHorizontalPadding fullscreen>
        <Header
          hasBackButton
          useCustomBackButton
          hasRightAccessory
          text="onboarding.forgotPass"
          backgroundColor={Colors.lightPurple}
        />
        <View style={styles.line}></View>
        <View style={styles.container}>
          <CText text="onboarding.email" color="black" size="md" />
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
              <Icon name="mail-outline" size={21} color={Colors.purple} />
            )}
          />
          <CButton
            text="buttons.send_new_password"
            onPress={handleSubmit(() => {
              navigation.navigate(RootStackRoutes.EDIT_PROFILE_SCREEN);
            })}
          />
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  line: {
    height: 1,
    borderBottomWidth: 0.2,
    borderColor: Colors.fadedPurple,
  },
});

import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LineInput } from '@components/Inputs/LineInput';
import { Colors } from '@constants/Colors';
import { EmailScheme, emailScheme } from '../../../../schemes/email.scheme';
import { styles } from './styles';

export const Question7 =
  ({}: OnboardingStackScreenProps<'Question7'>): JSX.Element => {
    const navigation = useNavigation();
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<EmailScheme>({
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
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header
          hasBackButton
          currentStep={7}
          totalSteps={7}
          text="common.questions_header"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple">
            7.
          </CText>
          <CText mt={5} size="xl_medium" color="purple" text="qa.question7" />
          <LineInput
            placeholderText="onboarding.questions_placeholder.email"
            inputType="qa"
            control={control}
            name="email"
            borderColor={
              errors.email
                ? Colors.lightRed
                : isFocused.email
                  ? Colors.fadedPurple
                  : Colors.fadedPurple
            }
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
          />
          {errors.email && (
            <View style={styles.errorContainer}>
              <CText size="sm" color="darkRed">
                {errors.email.message}
              </CText>
            </View>
          )}
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            onPress={handleSubmit(() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.THANKYOU_QA_SCREEN,
              });
            })}
          />
        </View>
      </Screen>
    );
  };

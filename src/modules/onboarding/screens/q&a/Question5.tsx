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
import {
  AnswersScheme,
  answersScheme,
} from '../../../../schemes/answers.scheme';
import { LineInput } from '@components/Inputs/LineInput';
import { Colors } from '@constants/Colors';
import { styles } from './styles';

export const Question5 =
  ({}: OnboardingStackScreenProps<'Question5'>): JSX.Element => {
    const navigation = useNavigation();
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<AnswersScheme>({
      defaultValues: {
        answer: '',
      },
      resolver: zodResolver(answersScheme),
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
          currentStep={5}
          totalSteps={7}
          text="common.questions_header"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple">
            5.
          </CText>
          <CText mt={5} size="xl_medium" color="purple">
            If yes, please specify your triggers. If no, please type "N/A".
          </CText>
          <LineInput
            placeholderText="onboarding.questions_placeholder.type_your_answer"
            inputType="qa"
            control={control}
            name="answer"
            borderColor={
              errors.answer
                ? Colors.lightRed
                : isFocused.answer
                  ? Colors.fadedPurple
                  : Colors.fadedPurple
            }
            onFocus={() => handleFocus('answer')}
            onBlur={() => handleBlur('answer')}
          />
          {errors.answer && (
            <View style={styles.errorContainer}>
              <CText size="sm" color="darkRed">
                {errors.answer.message}
              </CText>
            </View>
          )}
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            onPress={handleSubmit(() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.QUESTION_SIX_SCREEN,
              });
            })}
          />
        </View>
      </Screen>
    );
  };

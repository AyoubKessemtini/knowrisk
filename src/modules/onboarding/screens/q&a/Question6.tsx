import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { styles } from './styles';
import { SelectBox } from '@components/SelectBoxs/SelectBox';
import LineInput from '@components/Inputs/LineInput';
import {
  AnswersScheme,
  answersScheme,
} from '../../../../schemes/answers.scheme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Colors } from '@constants/Colors';

export const Question6 =
  ({}: OnboardingStackScreenProps<'Question6'>): JSX.Element => {
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
    const handleSelect = (value: string) => {
      console.log('Selected value:', value);
    };

    return (
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header
          hasBackButton
          currentStep={6}
          totalSteps={7}
          text="common.questions_header"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple">
            6.
          </CText>
          <CText mt={5} size="xl_medium" color="purple">
            Please provide your phone number.This question is required.
          </CText>
          <View style={styles.row}>
            <SelectBox
              options={['US', 'FR', 'LT']}
              placeholder="US"
              onSelect={handleSelect}
            />
            <View style={styles.inputContainer}>
              <LineInput
                placeholderText="onboarding.questions_placeholder.phone"
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
            </View>
          </View>
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
                screen: OnboardingStackRoutes.QUESTION_SEVEN_SCREEN,
              });
            })}
          />
        </View>
      </Screen>
    );
  };

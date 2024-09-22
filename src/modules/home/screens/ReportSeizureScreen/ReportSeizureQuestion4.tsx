import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
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
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';

export const ReportSeizureQuestion4 =
  ({}: RootStackScreenProps<'ReportSeizureQuestion4'>): JSX.Element => {
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
          useCustomBackButton
          text="report_seizure.report_seizure"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <CText
            size="xl_medium"
            color="purple1"
            text="report_seizure.question4"
          />
          <LineInput
            placeholderText="onboarding.questions_placeholder.type_your_answer"
            control={control}
            inputType="qa"
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
              navigation.navigate(RootStackRoutes.PROFILE_SCREEN);
            })}
          />
        </View>
      </Screen>
    );
  };

import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { LineInput } from '@components/Inputs/LineInput';
import { Colors } from '@constants/Colors';
import {
  AnswersScheme,
  answersScheme,
} from '../../../../schemes/answers.scheme';
import { styles } from './styles';
import { RootStackRoutes } from '@navigators/routes';
import { RootState } from '@store/index';
import {
  setEat,
  submitSeizureReportRequest,
} from '@store/reportSeizureFormSlice';

export const ReportSeizureQuestion4 = (): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, date, timeFrom, timeTo, alcohol, exercise } =
    useSelector((state: RootState) => state.reportSeizureForm);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Track button state

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

  const onSubmit = (data: AnswersScheme) => {
    setIsButtonDisabled(true); // Disable button when clicked
    dispatch(setEat(data.answer)); // Save answer in Redux
    if (
      date &&
      timeFrom &&
      timeTo &&
      alcohol !== undefined &&
      exercise !== undefined
    ) {
      dispatch(submitSeizureReportRequest());
      setIsSubmitted(true); // Indicate submission started
    } else {
      Alert.alert(
        'Error',
        'Some fields are missing. Please complete them before proceeding.',
      );
      setIsButtonDisabled(false); // Re-enable button if validation fails
    }
  };

  useEffect(() => {
    if (!loading && isSubmitted) {
      if (error) {
        Alert.alert('Error', error);
        setIsSubmitted(false); // Reset submission state
        setIsButtonDisabled(false); // Re-enable button after error
      } else {
        Alert.alert(
          'Success',
          'The report has been submitted successfully!',
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate(RootStackRoutes.TAB_STACK, {
                  screen: RootStackRoutes.HOME,
                }),
            },
          ],
          { cancelable: false },
        );
        setIsSubmitted(false); // Reset submission state
        setIsButtonDisabled(false); // Re-enable button after success
      }
    }
  }, [loading, error, navigation, isSubmitted]);

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
          onPress={handleSubmit(onSubmit)}
          disabled={isButtonDisabled} // Disable the button based on state
          containerStyle={{
            opacity: isButtonDisabled ? 0.5 : 1, // Reduce opacity when disabled
          }}
        />
      </View>
    </Screen>
  );
};

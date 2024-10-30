import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@store/index';
import {
  setEat,
  submitSeizureReportRequest,
} from '@store/reportSeizureFormSlice';

export const ReportSeizureQuestion4 =
  ({}: RootStackScreenProps<'ReportSeizureQuestion4'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading, error, date, timeFrom, timeTo, alcohol, exercise } =
      useSelector((state: RootState) => state.reportSeizureForm);

    const [isSubmitted, setIsSubmitted] = useState(false); // Ajout de l'état isSubmitted

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

    // Fonction de soumission du formulaire
    const onSubmit = (data: AnswersScheme) => {
      dispatch(setEat(data.answer)); // Enregistrer la réponse dans Redux
      // Déclencher l'appel API si tous les champs sont définis
      if (
        date &&
        timeFrom &&
        timeTo &&
        alcohol !== undefined &&
        exercise !== undefined
      ) {
        dispatch(submitSeizureReportRequest()); // Déclencher l'appel API
        setIsSubmitted(true); // Indiquer que la soumission a été initiée
      } else {
        Alert.alert(
          'Error',
          'Some fields are missing. Please complete them before proceeding.',
        );
      }
    };

    // Gestion de la réponse de l'API
    // Gestion de la réponse de l'API
    React.useEffect(() => {
      if (!loading && isSubmitted) {
        if (error) {
          Alert.alert('Error', error);
          setIsSubmitted(false); // Réinitialiser après une erreur
        } else {
          Alert.alert(
            'Success',
            'The report has been submitted successfully!',
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.PROFILE_SCREEN),
              },
            ],
            { cancelable: false },
          );
          setIsSubmitted(false); // Réinitialiser après le succès
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
          <CButton text="common.continue" onPress={handleSubmit(onSubmit)} />
        </View>
      </Screen>
    );
  };

import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { I18nKeyPath } from '../../../../i18n/types';
import { Colors } from '@constants/Colors';
import { useDispatch } from 'react-redux';
import { setExercise } from '@store/reportSeizureUpdateFormSlice';
import { RootStackParamList } from '@navigators/stacks/RootNavigator';
import { ChoiceBoxUpdateSeizure } from '@components/ChoiceBoxs/ChoiceBoxUpdateSeizure';

type ReportSeizureQuestion3UpdatedRouteProp = RouteProp<
  RootStackParamList,
  'ReportSeizureQuestion3Updated'
>;

export const ReportSeizureQuestion3Updated: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ReportSeizureQuestion3UpdatedRouteProp>();
  const dispatch = useDispatch();

  const { seizureEvent } = route.params;

  // Initialize selected option based on seizureEvent.exercise
  const [selectedOption, setSelectedOption] = useState<I18nKeyPath>(
    seizureEvent.exercise ? 'questions.choices.yes' : 'questions.choices.no',
  );

  // Handle selection and update Redux
  const handleChoiceSelect = (selectedValue: I18nKeyPath) => {
    setSelectedOption(selectedValue);
    const isExercise = selectedValue === 'questions.choices.yes';
    dispatch(setExercise(isExercise));
  };

  // Options for ChoiceBox
  const options: I18nKeyPath[] = [
    'questions.choices.yes',
    'questions.choices.no',
  ];

  const handleContinue = () => {
    const updatedSeizureEvent = {
      ...seizureEvent,
      exercise: selectedOption === 'questions.choices.yes',
    };

    navigation.navigate(
      RootStackRoutes.REPORT_SEIZURE_QUESTION_UPDATED_FOUR_SCREEN,
      {
        seizureEvent: updatedSeizureEvent,
      },
    );
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
          text="report_seizure.question3"
        />
        <ChoiceBoxUpdateSeizure
          options={options}
          selectedOption={selectedOption}
          onSelect={handleChoiceSelect}
        />
      </View>
      <View style={styles.button}>
        <CButton
          text="common.continue"
          disabled={!selectedOption}
          onPress={handleContinue}
        />
      </View>
    </Screen>
  );
};

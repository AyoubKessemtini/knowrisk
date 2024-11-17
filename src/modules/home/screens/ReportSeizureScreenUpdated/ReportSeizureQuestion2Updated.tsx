import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ChoiceBox } from '@components/ChoiceBoxs/ChoiceBox';
import { Colors } from '@constants/Colors';
import { useDispatch } from 'react-redux';
import { setAlcoholUpdated } from '@store/reportSeizureUpdateFormSlice';
import { I18nKeyPath } from 'src/i18n/types';
import { RootStackParamList } from '@navigators/stacks/RootNavigator';
import { ChoiceBoxUpdateSeizure } from '@components/ChoiceBoxs/ChoiceBoxUpdateSeizure';

type ReportSeizureQuestion2UpdatedRouteProp = RouteProp<
  RootStackParamList,
  'ReportSeizureQuestion2Updated'
>;

export const ReportSeizureQuestion2Updated: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ReportSeizureQuestion2UpdatedRouteProp>();
  const dispatch = useDispatch();

  const { seizureEvent } = route.params;

  // Initialize selected option based on seizureEvent.alcohol
  const [selectedOption, setSelectedOption] = useState<I18nKeyPath | null>(
    seizureEvent.alcohol ? 'questions.choices.yes' : 'questions.choices.no',
  );
  console.log('selectedOption', selectedOption);
  // Update Redux and selected option based on the user’s selection
  const handleChoiceSelect = (selectedValue: I18nKeyPath) => {
    setSelectedOption(selectedValue);
    const isAlcohol = selectedValue === 'questions.choices.yes';
    dispatch(setAlcoholUpdated(isAlcohol));
  };

  // Options for ChoiceBox
  const options: I18nKeyPath[] = [
    'questions.choices.yes',
    'questions.choices.no',
  ];

  const handleContinue = () => {
    const updatedSeizureEvent = {
      ...seizureEvent,
      alcohol: selectedOption === 'questions.choices.yes',
    };

    navigation.navigate(
      RootStackRoutes.REPORT_SEIZURE_QUESTION_UPDATED_THREE_SCREEN,
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
          text="report_seizure.question2"
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
          disabled={selectedOption === null}
          onPress={handleContinue}
        />
      </View>
    </Screen>
  );
};

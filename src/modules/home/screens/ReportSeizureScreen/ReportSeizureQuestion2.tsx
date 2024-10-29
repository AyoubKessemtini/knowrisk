import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ChoiceBox } from '@components/ChoiceBoxs/ChoiceBox';
import { Colors } from '@constants/Colors';
import { useDispatch } from 'react-redux';
import { setAlcohol } from '@store/reportSeizureFormSlice';
import { I18nKeyPath } from 'src/i18n/types';

export const ReportSeizureQuestion2 =
  ({}: RootStackScreenProps<'ReportSeizureQuestion2'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Stocker l'option sélectionnée sous forme de booléen
    const [selectedOption, setSelectedOption] = useState<I18nKeyPath | null>(
      null,
    );

    // Gestion de la sélection
    const handleChoiceSelect = (selectedValue: I18nKeyPath) => {
      setSelectedOption(selectedValue);

      // Convertit `I18nKeyPath` en booléen pour Redux
      const isAlcohol = selectedValue === 'questions.choices.yes';
      dispatch(setAlcohol(isAlcohol)); // Enregistre dans Redux en tant que booléen
    };

    // Options pour Oui/Non
    // Options avec `I18nKeyPath`
    // Options avec `I18nKeyPath`

    const options: I18nKeyPath[] = [
      'questions.choices.yes',
      'questions.choices.no',
    ];

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

          <ChoiceBox options={options} onSelect={handleChoiceSelect} />
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            disabled={selectedOption === null}
            onPress={() => {
              navigation.navigate(
                RootStackRoutes.REPORT_SEIZURE_QUESTION_THREE_SCREEN,
              );
            }}
          />
        </View>
      </Screen>
    );
  };

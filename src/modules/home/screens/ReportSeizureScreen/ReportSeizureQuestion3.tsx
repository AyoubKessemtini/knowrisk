import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ChoiceBox } from '@components/ChoiceBoxs/ChoiceBox';
import { I18nKeyPath } from '../../../../i18n/types';
import { Colors } from '@constants/Colors';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';

export const ReportSeizureQuestion3 =
  ({}: RootStackScreenProps<'ReportSeizureQuestion3'>): JSX.Element => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState<I18nKeyPath | null>(
      null,
    );
    const handleChoiceSelect = (selectedValue: I18nKeyPath) => {
      setSelectedOption(selectedValue);
    };
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
            text="report_seizure.question3"
          />
          <ChoiceBox options={options} onSelect={handleChoiceSelect} />
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            disabled={!selectedOption}
            onPress={() => {
              navigation.navigate(
                RootStackRoutes.REPORT_SEIZURE_QUESTION_FOUR_SCREEN,
              );
            }}
          />
        </View>
      </Screen>
    );
  };

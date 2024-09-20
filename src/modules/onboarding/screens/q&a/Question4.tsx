import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ChoiceBox } from '@components/ChoiceBoxs/ChoiceBox';
import { I18nKeyPath } from '../../../../i18n/types';
import { Colors } from '@constants/Colors';

export const Question4 =
  ({}: OnboardingStackScreenProps<'Question4'>): JSX.Element => {
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
          currentStep={4}
          totalSteps={7}
          text="common.questions_header"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple">
            4.
          </CText>
          <CText mt={5} size="xl_medium" color="purple" text="qa.question4" />
          <ChoiceBox options={options} onSelect={handleChoiceSelect} />
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            disabled={!selectedOption}
            onPress={() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.QUESTION_FIVE_SCREEN,
              });
            }}
          />
        </View>
      </Screen>
    );
  };

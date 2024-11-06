import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { I18nKeyPath } from '../../../../i18n/types';
import { Colors } from '@constants/Colors';
import { useDispatch } from 'react-redux';
import { ProfileActions } from '@store/profileSlice';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { i18n } from 'src/i18n';

export const Question4 =
  ({}: OnboardingStackScreenProps<'Question4'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [selectedOptions, setSelectedOptions] = useState<I18nKeyPath[]>([]);

    const handleChoiceSelect = (selectedValue: I18nKeyPath) => {
      setSelectedOptions((prevSelectedOptions) => {
        const isIDontKnowSelected =
          selectedValue === 'questions.choices.i_dont_know_my_triggers';

        if (isIDontKnowSelected) {
          return [selectedValue]; // Clear others if "I don't know my triggers" is selected
        }

        const updatedSelections = prevSelectedOptions.includes(selectedValue)
          ? prevSelectedOptions.filter((option) => option !== selectedValue)
          : [
              ...prevSelectedOptions.filter(
                (option) =>
                  option !== 'questions.choices.i_dont_know_my_triggers',
              ),
              selectedValue,
            ];

        return updatedSelections;
      });
    };

    const options: I18nKeyPath[] = [
      'questions.choices.sleep',
      'questions.choices.stress',
      'questions.choices.fatigue',
      'questions.choices.food',
      'questions.choices.exercise',
      'questions.choices.i_dont_know_my_triggers',
    ];

    const handleContinue = () => {
      // Translate selected options to user-friendly text
      const translatedTriggers = selectedOptions
        .map((option) => i18n.t(option))
        .join(', ');
      dispatch(
        ProfileActions.updateProfileData({ triggers: translatedTriggers }),
      );
      console.log('translatedTriggers Options: ', translatedTriggers); // Debugging: Verify selected options
      navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
        screen: OnboardingStackRoutes.THANKYOU_QA_SCREEN,
      });
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
          currentStep={3}
          totalSteps={3}
          text="common.questions_header"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple">
            3.
          </CText>
          <CText mt={5} size="xl_medium" color="purple" text="qa.question4" />
          <View>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleChoiceSelect(option)}
                style={{
                  backgroundColor: selectedOptions.includes(option)
                    ? Colors.deepPurple
                    : Colors.grey1,
                  padding: 13,
                  borderRadius: 8,
                  marginVertical: 5,
                }}
              >
                <CText
                  size="sm_medium"
                  color={
                    selectedOptions.includes(option) ? 'white' : 'purpleGrey'
                  }
                  text={option} // Pass original I18nKeyPath
                >
                  {i18n.t(option)} {/* Display the translated text */}
                </CText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            disabled={selectedOptions.length === 0}
            onPress={handleContinue}
          />
        </View>
      </Screen>
    );
  };

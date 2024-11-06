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

export const Question3 =
  ({}: OnboardingStackScreenProps<'Question3'>): JSX.Element => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selectedOptions, setSelectedOptions] = useState<I18nKeyPath[]>([]);

    const handleChoiceSelect = (selectedValue: I18nKeyPath | I18nKeyPath[]) => {
      const selectedKey = Array.isArray(selectedValue)
        ? selectedValue[0]
        : selectedValue;

      const translatedValue = i18n.t(selectedKey); // Translate the selected key to get the label
      console.log('translatedValue', translatedValue);
      setSelectedOptions([selectedKey]); // Maintain single selection as an array

      dispatch(
        ProfileActions.updateProfileData({ seizures_per_day: translatedValue }), // Dispatch the translated label
      );
    };

    const options = [
      {
        key: 'questions.choices.once_a_year',
        label: i18n.t('questions.choices.once_a_year'),
      },
      {
        key: 'questions.choices.times_a_year',
        label: i18n.t('questions.choices.times_a_year'),
      },
      {
        key: 'questions.choices.once_a_month',
        label: i18n.t('questions.choices.once_a_month'),
      },
      {
        key: 'questions.choices.times_a_month',
        label: i18n.t('questions.choices.times_a_month'),
      },
      {
        key: 'questions.choices.once_a_week',
        label: i18n.t('questions.choices.once_a_week'),
      },
      {
        key: 'questions.choices.multiple_times_a_week',
        label: i18n.t('questions.choices.multiple_times_a_week'),
      },
      {
        key: 'questions.choices.daily',
        label: i18n.t('questions.choices.daily'),
      },
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
          currentStep={2}
          totalSteps={3}
          text="common.questions_header"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple">
            2.
          </CText>
          <CText mt={5} size="xl_medium" color="purple" text="qa.question3" />
          <View>
            {options.map((option) => (
              <TouchableOpacity
                key={option.key} // Ensure each key is a unique string
                onPress={() => handleChoiceSelect(option.key)}
                style={{
                  backgroundColor: selectedOptions.includes(option.key)
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
                    selectedOptions.includes(option.key)
                      ? 'white'
                      : 'purpleGrey'
                  }
                >
                  {option.label} {/* Display the translated text */}
                </CText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            disabled={selectedOptions.length === 0}
            onPress={() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.QUESTION_FOUR_SCREEN,
              });
            }}
          />
        </View>
      </Screen>
    );
  };

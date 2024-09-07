import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const IntroQuestionScreen =
  ({}: OnboardingStackScreenProps<'IntroQuestionScreen'>): JSX.Element => {
    const navigation = useNavigation();

    return (
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header
          hasBackButton
          currentStep={1}
          totalSteps={7}
          text="common.questions_header"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple">
            Ally is designed to help you forecast your potential risk of Seizure
            !
          </CText>
          <CText mt={20} size="sm_medium" color="purple">
            Let us know you better
          </CText>
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            onPress={() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.QUESTION_ONE_SCREEN,
              });
            }}
          />
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 29,
  },
  button: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

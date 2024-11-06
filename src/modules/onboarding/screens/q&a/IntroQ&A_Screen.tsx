import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@constants/Colors';

export const IntroQuestionScreen =
  ({}: OnboardingStackScreenProps<'IntroQuestionScreen'>): JSX.Element => {
    const navigation = useNavigation();
    console.log('IntroQuestionScreen');

    return (
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header
          hasBackButton
          useCustomBackButton
          text="common.questions_header"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <CText size="xl_medium" color="purple" text="qa.intro" />
          <CText
            mt={20}
            size="sm_medium"
            color="purple"
            text="qa.let_us_know_you_better"
          />
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

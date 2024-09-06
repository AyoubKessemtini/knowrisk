import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { useAuth } from '@hooks/useAuth';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const IntroQuestionScreen =
  ({}: OnboardingStackScreenProps<'IntroQuestionScreen'>): JSX.Element => {
    const { logout } = useAuth();
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
          <CText size="xl_bold">1.</CText>
          <CButton
            mt={50}
            text="common.logout"
            onPress={async () => {
              await logout();
              await navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.LOGIN_SCREEN,
              });
            }}
          />
        </View>
      </Screen>
    );
  };

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  container: {
    paddingTop: 0,
  },
});

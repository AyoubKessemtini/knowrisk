import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CImage } from '@components/CImage';
import ImageAssets from '@assets/images';

export const ThankyouScreen =
  ({}: OnboardingStackScreenProps<'ThankyouScreen'>): JSX.Element => {
    const navigation = useNavigation();

    return (
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header hasBackButton text="common.questions_header" />
        <View style={styles.wrapper}>
          <CImage
            source={ImageAssets.THANKYOU_HEART}
            height={280}
            width={280}
          />
          <CText
            mt={40}
            size="xxl_bold"
            color="purple1"
            isCentered
            text="common.thank_you"
          />
          <CText
            mt={20}
            size="lg_medium"
            color="purpleGrey"
            isCentered
            text="qa.outro1"
          />
          <CText
            mt={20}
            size="sm_medium"
            color="purpleGrey"
            isCentered
            text="qa.outro2"
          />
        </View>
        <View style={styles.button}>
          <CButton
            text="common.submit"
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
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

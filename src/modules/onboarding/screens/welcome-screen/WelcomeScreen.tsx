import React from 'react';
import { StyleSheet, View, ImageBackground, Pressable } from 'react-native';
import { CButton } from '@components/Buttons/CButton';
import { OnboardingStackRoutes, RootStackRoutes } from '@navigators/routes';
import { OnboardingStackScreenProps } from '@navigators/stacks/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import ImageAssets from '@assets/images';
import { CText } from '@components/CText';

export const WelcomeScreen =
  ({}: OnboardingStackScreenProps<'WelcomeScreen'>): JSX.Element => {
    const navigation = useNavigation();

    return (
      <ImageBackground
        source={ImageAssets.WELCOME_BG}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <CText color="white" size="lg" mb={10} isCentered>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </CText>
          <CButton
            text="onboarding.get_started"
            onPress={() => {
              navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                screen: OnboardingStackRoutes.SIGNUP_SCREEN,
              });
            }}
          />
          <CText isCentered color="white" size="lg_medium">
            <CText color="white" size="md" text="onboarding.already_member" />{' '}
            <Pressable
              onPress={() => {
                navigation.navigate(RootStackRoutes.ONBOARDING_STACK, {
                  screen: OnboardingStackRoutes.LOGIN_SCREEN,
                });
              }}
            >
              <CText
                size="md_bold"
                color="deepPurple"
                text="onboarding.login"
              />
            </Pressable>
          </CText>
        </View>
      </ImageBackground>
    );
  };

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 70,
    gap: 15,
  },
});

export const RootStackRoutes = {
  TAB_STACK: 'TabStack',
  FOO_STACK: 'FooStack',
  ONBOARDING_STACK: 'OnboardingStack',
} as const;

export const TabBarStackRoutes = {
  HOME: 'home',
  PROFILE: 'profile',
} as const;

export const FooStackRoutes = {
  FOO_SCREEN: 'FooScreen',
  BOO_SCREEN: 'BooScreen',
} as const;
export const OnboardingStackRoutes = {
  LOGIN_SCREEN: 'LoginScreen',
  WELCOME_SCREEN: 'WelcomeScreen',
  SIGNUP_SCREEN: 'SignUpScreen',
  INTRO_QUESTION_SCREEN: 'IntroQuestionScreen',
  QUESTION_ONE_SCREEN: 'Question1',
  QUESTION_TWO_SCREEN: 'Question2',
  QUESTION_THREE_SCREEN: 'Question3',
  QUESTION_FOUR_SCREEN: 'Question4',
  QUESTION_FIVE_SCREEN: 'Question5',
  QUESTION_SIX_SCREEN: 'Question6',
  QUESTION_SEVEN_SCREEN: 'Question7',
  THANKYOU_QA_SCREEN: 'ThankyouScreen',
  PROFILE_SCREEN: 'profile',
  SETTINGS_INFORMATION_SCREEN: 'SettingsInformationScreen',
} as const;

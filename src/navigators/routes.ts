export const RootStackRoutes = {
  TAB_STACK: 'TabStack',
  FOO_STACK: 'FooStack',
  ONBOARDING_STACK: 'OnboardingStack',
  PROFILE_SCREEN: 'profile',
  SETTINGS_INFORMATION_SCREEN: 'SettingsInformationScreen',
  EDIT_PROFILE_SCREEN: 'EditProfileScreen',
  CHANGE_PASSWORD_SCREEN: 'ChangePasswordScreen',
  REPORT_SEIZURE_INTRO_SCREEN: 'ReportSeizureIntro',
  REPORT_SEIZURE_QUESTION_ONE_SCREEN: 'ReportSeizureQuestion1',
  REPORT_SEIZURE_QUESTION_TWO_SCREEN: 'ReportSeizureQuestion2',
  REPORT_SEIZURE_QUESTION_THREE_SCREEN: 'ReportSeizureQuestion3',
  REPORT_SEIZURE_QUESTION_FOUR_SCREEN: 'ReportSeizureQuestion4',
} as const;

export const TabBarStackRoutes = {
  HOME: 'home',
  PROFILE: 'profile',
  DEVICE_LIST: 'device_list',
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
  FORGOT_PASSWORD_SCREEN: 'ForgotPasswordScreen',
} as const;

import { CButton } from '@components/Buttons/CButton';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { RootStackRoutes } from '@navigators/routes';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@constants/Colors';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';

export const ReportSeizureIntro =
  ({}: RootStackScreenProps<'ReportSeizureIntro'>): JSX.Element => {
    const navigation = useNavigation();

    return (
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header
          hasBackButton
          useCustomBackButton
          text="report_seizure.report_seizure"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <CText
            size="xl_medium"
            color="purple1"
            text="report_seizure.intro_question"
            isCentered
          />
          <CText
            mt={20}
            size="sm_medium"
            color="grey4"
            text="report_seizure.help_us"
            isCentered
          />
        </View>
        <View style={styles.button}>
          <CButton
            text="common.continue"
            onPress={() => {
              navigation.navigate(
                RootStackRoutes.REPORT_SEIZURE_QUESTION_ONE_SCREEN,
              );
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

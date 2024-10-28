import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { QuestionComponent } from '@components/questioncard';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { Header } from '@components/Headers/Header.tsx';
import { CButton } from '@components/Buttons/CButton.tsx';

export const JournalScreen: React.FC = () => {
  const questionsData = [
    {
      category: 'Lifestyle',
      questions: ['Have any alcoholic drinks?', 'Have any alcoholic drinks?'],
    },
    {
      category: 'Nutrition',
      questions: ['Have any alcoholic drinks?'],
    },
    {
      category: 'Sleep',
      questions: ['Have any alcoholic drinks?'],
    },
  ];
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <Header
        hasBackButton
        useCustomBackButton
        text="common.journal"
        textColor="black"
      />
      <View style={styles.wrapper}>
        {/*<NotesList />*/}
        {/* <NotesListReader /> */}
        {/* <MedicationsList /> */}
        {questionsData.map((section, index) => (
          <View key={index} style={styles.sectionContainer}>
            <CText size="lg_bold" color="purple">
              {section.category}
            </CText>
            {section.questions.map((question, idx) => (
              <QuestionComponent key={idx} question={question} />
            ))}
          </View>
        ))}
        {/* <ReportSeizureCard onPress={() => {}} /> */}
      </View>
      <CButton
        text="buttons.save"
        onPress={() => {
          console.log('save journal');
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
    gap: 30,
  },
  sectionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    borderRadius: 10,
    padding: 10,
  },
});

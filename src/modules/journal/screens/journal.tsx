import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { QuestionComponent } from '@components/questioncard';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { Header } from '@components/Headers/Header.tsx';
import { CButton } from '@components/Buttons/CButton.tsx';
import { DateSelector } from '@components/DatePicker/DatePicker.tsx';
import { formatStringDate } from '@hooks/useDateFormatter.ts';
import { Journal } from '@core/entities/deviceDataApisEntity/Journal.ts';
import { core } from '@config/Configuration.ts';
import { UpdateDailyJournalCommand } from '@core/usecases/journal/UpdateDailyJournal.ts';

export const JournalScreen: React.FC = () => {
  type GroupedJournal = {
    [category: string]: Omit<Journal, 'category'>[];
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journal, setJournal] = useState<GroupedJournal>({});
  const [journalExists, setJournalExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const groupQuestionsByCategory = (j: Journal[]): GroupedJournal => {
    return j.reduce((acc, question) => {
      const { category, ...rest } = question;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(rest);
      return acc;
    }, {} as GroupedJournal);
  };
  useEffect(() => {
    const fetchJournal = async () => {
      setLoading(true);
      const dailyJournal = await core.getDailyJournal.execute({
        date: formatStringDate(selectedDate),
      });
      if (dailyJournal.length === 0) {
        setLoading(false);
        Alert.alert('Error', 'No questions for the chosen date.');
        setJournalExists(false);
      } else {
        setLoading(false);
        setJournalExists(true);
        setJournal(groupQuestionsByCategory(dailyJournal));
      }
    };
    fetchJournal();
  }, [selectedDate]);

  const handleDateChange = (newDate: Date) => {
    if (newDate > new Date()) {
      Alert.alert(
        'Date error',
        `Questions of (${formatStringDate(newDate)}) are not available.`,
      );
    } else {
      setSelectedDate(newDate);
    }
  };

  const handleAnswerChange = (
    category: string,
    questionId: number,
    newAnswer: boolean | null,
  ) => {
    setJournal((prevJournal) => ({
      ...prevJournal,
      [category]: prevJournal[category].map((question) =>
        question.question_id === questionId
          ? { ...question, answer: newAnswer }
          : question,
      ),
    }));
  };

  const ungroupJournal = (grouped: GroupedJournal): Journal[] => {
    return Object.entries(grouped).flatMap(([category, questions]) =>
      questions.map((question) => ({
        ...question,
        category,
      })),
    );
  };

  const transformQuestions = (questions): UpdateDailyJournalCommand => {
    return questions.map(({ question_id, answer }) => ({
      question_id: Number(question_id),
      answer,
    }));
  };
  const saveJournal = (j) => {
    const ungroupedJournal = ungroupJournal(j);
    const nullAnswers = ungroupedJournal.filter((j) => j.answer == null);
    if (nullAnswers.length > 0) {
      Alert.alert('Error', 'Please complete all the questions.');
    } else {
      core.updateDailyJournal
        .execute(transformQuestions(ungroupedJournal))
        .then(() => {
          Alert.alert('Success', 'Your answers are successfully saved.');
        })
        .catch((e) => {
          console.log(e);
          Alert.alert('Error', 'Unknown error, please try again.');
        });
    }
  };

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
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 200 }}
          size="large"
          color="#0000ff"
        />
      )}
      {!loading && (
        <>
          <View style={styles.wrapper}>
            <DateSelector
              initialDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <CText
              style={{ textAlign: 'center' }}
              mt={20}
              mb={20}
              size={'md_light'}
              color={'grey3'}
            >
              {journalExists
                ? `What happened ${formatStringDate(selectedDate)}`
                : 'No questions for the chosen date.'}
            </CText>
            {journalExists && (
              <>
                {Object.entries(journal).map(([category, questions], idx) => (
                  <View key={idx} style={styles.sectionContainer}>
                    <CText size="lg_bold" color="purple">
                      {category}
                    </CText>
                    {questions.map((question, questionIdx) => (
                      <QuestionComponent
                        key={question.question_id}
                        answer={question.answer}
                        question={question.question_text}
                        onAnswerChange={(newAnswer) =>
                          handleAnswerChange(
                            category,
                            question.question_id,
                            newAnswer,
                          )
                        }
                      />
                    ))}
                  </View>
                ))}
              </>
            )}
          </View>
          {formatStringDate(selectedDate) === formatStringDate(new Date()) &&
            journalExists && (
              <CButton
                text="buttons.save"
                onPress={() => saveJournal(journal)}
              />
            )}
        </>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  sectionContainer: {
    marginTop: 7,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    borderRadius: 10,
    padding: 10,
  },
});

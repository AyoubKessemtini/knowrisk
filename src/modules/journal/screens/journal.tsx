import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { QuestionComponent } from '@components/questioncard';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { Header } from '@components/Headers/Header.tsx';
import { CButton } from '@components/Buttons/CButton.tsx';
import { DateSelector } from '@components/DatePicker/DatePicker.tsx';
import { formatStringDate } from '@hooks/useDateFormatter.ts';

export const JournalScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const questionsData = [
    {
      category: 'Stress',
      questions: [
        'Did you experience stress today?',
        'Did you have any emotional distress or anxiety today?',
        'Did you notice any changes in your mood or mental state today?',
      ],
    },
    {
      category: 'Nutrition',
      questions: [
        'Did you consume any caffeine today?',
        'Did you consume any alcohol today?',
        'Did you consume any new foods or drinks today?',
      ],
    },
    {
      category: 'Sleep',
      questions: [
        'Did you experience any unusual lack of sleep last night?',
        'Were you feeling particularly tired or fatigued today?',
      ],
    },
    {
      category: 'Physical Activity',
      questions: ['Did you engage in any intense physical activity today?'],
    },
    {
      category: 'Environment',
      questions: [
        'Were you exposed to flashing or bright lights today?',
        'Were you in a crowded or noisy environment today?',
      ],
    },
    {
      category: 'Medication',
      questions: [
        'Did you miss any doses of your prescribed medication today?',
      ],
    },
    {
      category: 'Headaches/Migraines',
      questions: ['Did you experience a headache or migraine today?'],
    },
    {
      category: 'Screen Time',
      questions: [
        'Did you spend more time than usual on screens (phone, computer, etc.) today?',
      ],
    },
  ];
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
  const allQuestions = questionsData.flatMap((section) =>
    section.questions.map((question) => ({
      question,
      category: section.category,
    })),
  );
  const shuffleArray = (array: { question: string; category: string }[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const randomQuestions = shuffleArray(allQuestions).slice(0, 4);
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
          {' '}
          What happened {formatStringDate(selectedDate)}
        </CText>
        {randomQuestions.map((item, idx) => (
          <View key={idx} style={styles.sectionContainer}>
            <CText size="lg_bold" color="purple">
              {item.category}
            </CText>
            <QuestionComponent key={idx} question={item.question} />
          </View>
        ))}
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

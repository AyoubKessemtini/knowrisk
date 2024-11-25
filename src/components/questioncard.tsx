import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CText } from '@components/CText'; // Assuming CText is your custom text component
import { Colors } from '@constants/Colors'; // Assuming Colors contains your app's color definitions
import Icon from 'react-native-easy-icon';

interface QuestionProps {
  question: string;
  answer: boolean | null;
  onAnswerChange: (newAnswer: boolean | null) => void;
}

export const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  answer,
  onAnswerChange,
}) => {
  return (
    <View style={styles.questionContainer}>
      <CText size="md" color="purpleGrey" style={styles.questionText}>
        {question}
      </CText>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          style={[
            styles.answerButton,
            answer === false ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => onAnswerChange(false)}
        >
          <CText size="md" color={answer === false ? 'white' : 'fadedPurple'}>
            ✕
          </CText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.answerButton,
            answer === true ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => onAnswerChange(true)}
        >
          <CText size="md" color={answer === true ? 'white' : 'fadedPurple'}>
            <Icon type="material" name="done" size={15} />
          </CText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.magnolia,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensures the container takes up full width
  },
  questionText: {
    flex: 1, // Allows the text to take the available space before the icons
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
    alignItems: 'center',
  },
  answerButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  selectedButton: {
    backgroundColor: Colors.deepPurple, // Highlight selected button
  },
  unselectedButton: {
    backgroundColor: Colors.lightPurple, // Grey background for unselected buttons
  },
});

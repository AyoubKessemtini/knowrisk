import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { GiftedChat, IMessage, QuickReply } from 'react-native-gifted-chat';
import { Header } from '@components/Headers/Header';
import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';

export const ChatBotScreen =
  ({}: RootStackScreenProps<'chatbot'>): JSX.Element => {
    const [messages, setMessages] = useState<IMessage[]>([
      {
        _id: 1,
        text: 'Hello! I am the Knowlepsy chatbot. How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Knowlepsy Chatbot',
        },
        quickReplies: {
          type: 'radio',
          values: [
            {
              title: 'What are the risks of seizures?',
              value: 'What are the risks of seizures?',
            },
            {
              title: 'How can I prevent a seizure?',
              value: 'How can I prevent a seizure?',
            },
            {
              title: 'What should I do during a seizure?',
              value: 'What should I do during a seizure?',
            },
          ],
        },
      },
    ]);

    const predefinedQA: { [key: string]: string } = {
      'What are the risks of seizures?':
        'Seizure risks can vary but often include triggers like lack of sleep, stress, or missing medication. Some individuals also have environmental triggers such as flashing lights.',
      'How can I prevent a seizure?':
        'To minimize seizure risks, take your prescribed medications, maintain a regular sleep schedule, avoid alcohol, and manage stress effectively. It’s important to understand your personal triggers.',
      'What should I do during a seizure?':
        'Stay calm, help the person lie on their side, protect their head, and do not restrain them. Call emergency services if the seizure lasts longer than 5 minutes.',
      'How can Knowlepsy help me manage my health?':
        'The Knowlepsy app helps you track your seizures, identify triggers, and manage your medication. It also provides educational resources and support.',
      'What triggers seizures?':
        'Common seizure triggers include lack of sleep, stress, bright or flashing lights, alcohol, and missed medications. Monitoring these can help reduce the risk.',
      'Can stress cause seizures?':
        'Yes, stress is a common trigger for seizures. Managing stress through relaxation techniques, exercise, and healthy lifestyle choices can help reduce the risk.',
    };

    const quickReplyOptions: { [key: string]: QuickReply[] } = {
      default: [
        { title: 'What triggers seizures?', value: 'What triggers seizures?' },
        {
          title: 'How can Knowlepsy help?',
          value: 'How can Knowlepsy help me manage my health?',
        },
      ],
      stress: [
        {
          title: 'How can I reduce stress?',
          value: 'How can I reduce stress?',
        },
        {
          title: 'Can stress cause seizures?',
          value: 'Can stress cause seizures?',
        },
      ],
      seizure: [
        {
          title: 'What are common triggers?',
          value: 'What are the common seizure triggers?',
        },
        {
          title: 'What should I do during a seizure?',
          value: 'What should I do during a seizure?',
        },
      ],
    };

    const handleSend = useCallback((newMessages: IMessage[] = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages),
      );

      const userMessage = newMessages[0].text;
      const botResponse = getBotResponse(userMessage);

      const nextQuickReplies = getNextQuickReplies(userMessage);

      if (botResponse) {
        const botMessage: IMessage = {
          _id: Math.random().toString(),
          text: botResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Knowlepsy Chatbot',
          },
          quickReplies: {
            type: 'radio',
            values: nextQuickReplies,
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessage]),
        );
      } else {
        const botMessage: IMessage = {
          _id: Math.random().toString(),
          text: "Sorry, I don't understand that question. Please try asking something else.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Knowlepsy Chatbot',
          },
          quickReplies: {
            type: 'radio',
            values: quickReplyOptions.default,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessage]),
        );
      }
    }, []);

    const handleQuickReply = (replies: QuickReply[]) => {
      const userReply = replies[0].value;
      const userMessage: IMessage = {
        _id: Math.random().toString(),
        text: userReply,
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };

      handleSend([userMessage]);
    };

    const getBotResponse = (userMessage: string) => {
      const normalizedMessage = userMessage.trim().toLowerCase();
      const matchedResponse = Object.keys(predefinedQA).find(
        (question) => question.toLowerCase() === normalizedMessage,
      );
      return matchedResponse ? predefinedQA[matchedResponse] : null;
    };

    const getNextQuickReplies = (userMessage: string) => {
      if (userMessage.includes('stress')) return quickReplyOptions.stress;
      if (userMessage.includes('seizure')) return quickReplyOptions.seizure;
      return quickReplyOptions.default;
    };

    return (
      <Screen
        withoutTopEdge
        noHorizontalPadding
        containerStyles={styles.container}
      >
        <Header
          hasBackButton
          useCustomBackButton
          text="common.chatbot"
          backgroundColor={Colors.lightPurple}
          textColor="purple1"
        />
        <View style={styles.wrapper}>
          <GiftedChat
            messages={messages}
            onSend={(newMessages) => handleSend(newMessages)}
            user={{ _id: 1 }}
            onQuickReply={handleQuickReply}
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
    backgroundColor: Colors.white,
  },
});

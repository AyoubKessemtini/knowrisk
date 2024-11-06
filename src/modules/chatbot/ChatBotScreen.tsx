import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import {RootStackScreenProps} from "@navigators/stacks/RootNavigator.tsx";
import Icon from "react-native-easy-icon";
import {Header} from "@components/Headers/Header.tsx";
import {Colors} from "@constants/Colors.ts";
import {core} from "@config/Configuration.ts";

export const ChatBotScreen =
    ({}: RootStackScreenProps<'chatbot'>): JSX.Element => {
        const [chatUser] = useState({
            name: 'epyChat',
            profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
            last_seen: 'online',
        });


        const [currentUser] = useState({
            name: 'user',
        });

        const [messages, setMessages] = useState([
            {
                sender: chatUser.name,
                message: 'Hello, I am EpyChat, how can I assit you today?',
                time: '6:02 AM',
            },
        ]);

        const [inputMessage, setInputMessage] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        function getTime(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

        async function sendMessage() {
            if (inputMessage === '') {
                return setInputMessage('');
            }
            let t = getTime(new Date());
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: currentUser.name,
                    message: inputMessage,
                    time: t,
                },
            ]);
            const message=inputMessage;
            setInputMessage('');
            setIsLoading(true);
            const response = await core.sendMessage.execute(message);
            if (response != null) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        sender: chatUser.name,
                        message: response,
                        time: t,
                    },
                ]);
            }else {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        sender: chatUser.name,
                        message: "I'm currently receiving too many requests. Please wait a moment and try again.",
                        time: t,
                    },
                ]);
            }
            setIsLoading(false);
        }


        useEffect(() => {

        }, []);

        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // Adjust this value based on your header height
            >
                <Header
                    hasBackButton
                    useCustomBackButton
                    text="common.chatbot"
                    backgroundColor={Colors.lightPurple}
                    textColor="purple1"
                />
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <FlatList
                            style={{ backgroundColor: '#f2f2ff' }}
                            inverted={true}
                            data={JSON.parse(JSON.stringify(messages)).reverse()}
                            renderItem={({ item }) => (
                                <TouchableWithoutFeedback>
                                    <View style={{ marginTop: 6 }}>
                                        <View
                                            style={{
                                                maxWidth: Dimensions.get('screen').width * 0.8,
                                                backgroundColor: '#3a6ee8',
                                                alignSelf:
                                                    item.sender === currentUser.name
                                                        ? 'flex-end'
                                                        : 'flex-start',
                                                marginHorizontal: 10,
                                                padding: 10,
                                                borderRadius: 8,
                                                borderBottomLeftRadius:
                                                    item.sender === currentUser.name ? 8 : 0,
                                                borderBottomRightRadius:
                                                    item.sender === currentUser.name ? 0 : 8,
                                            }}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 16 }}>
                                                {item.message}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#dfe4ea',
                                                    fontSize: 14,
                                                    alignSelf: 'flex-end',
                                                }}
                                            >
                                                {item.time}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            ListFooterComponent={() => (
                                isLoading ? (
                                    <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10 }}>
                                        <Text style={{ color: '#666', fontSize: 14 }}>ChatBot is typing...</Text>
                                        {/* Optionally add a loading spinner here */}
                                        <Icon name="spinner" type="font-awesome" color="#666" spin size={16} />
                                    </View>
                                ) : null
                            )}
                        />


                        <View style={{ paddingVertical: 30 }}>
                            <View style={styles.messageInputView}>
                                <TextInput
                                    defaultValue={inputMessage}
                                    style={styles.messageInput}
                                    placeholder='Message'
                                    onChangeText={(text) => setInputMessage(text)}
                                    onSubmitEditing={() => {
                                        sendMessage();
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.messageSendView}
                                    onPress={() => {
                                        sendMessage();
                                    }}
                                >
                                    <Icon name='send' type='material' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

const styles = StyleSheet.create({
    headerLeft: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfileImage: {height: '100%', aspectRatio: 1, borderRadius: 100},
    container: {
        flex: 1,
        backgroundColor: '#f2f2ff',
    },
    messageInputView: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    messageInput: {
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
    },
    messageSendView: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
});
/*
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

 */
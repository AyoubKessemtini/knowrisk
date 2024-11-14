import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Screen } from '@components/Screen';
import { EventCalendar } from '@components/EventCalendar';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { RootState } from '@store/index';
import { seizureActions } from '@store/sagas/seizureSlice';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deleteSeizureActions } from '@store/deleteSeizureSlice';
import { Colors } from '@constants/Colors';
import { RootStackRoutes } from '@navigators/routes';
import { SeizureEvent } from '@utils/types'; // Make sure SeizureEvent includes all needed properties

export const SeizureForecastScreen: React.FC<
  RootStackScreenProps<'SeizureForecastScreen'>
> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { events, loading, successMessage, error } = useSelector(
    (state: RootState) => state.seizureForecast,
  );
  const {
    successMessage: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector((state: RootState) => state.deleteSeizure);

  const [userId, setUserId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates = events.reduce(
    (acc, event: SeizureEvent) => {
      acc[event.date] = {
        selected: true,
        marked: true,
        selectedColor: event.type === 'Reported' ? '#e74c3c' : '#2ecc71',
      };
      return acc;
    },
    {} as Record<
      string,
      { selected: boolean; marked: boolean; selectedColor: string }
    >,
  );

  useEffect(() => {
    const fetchUserId = async () => {
      const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user.id);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (deleteSuccess) {
      Alert.alert('Success', deleteSuccess);
      dispatch(deleteSeizureActions.deleteSeizureReset());

      if (userId) {
        dispatch(
          seizureActions.fetchSeizureForecastRequest({
            id: userId,
            month: new Date().toISOString().slice(0, 7),
          }),
        );
      }
    }
    if (deleteError) {
      Alert.alert('Error', deleteError);
      dispatch(deleteSeizureActions.deleteSeizureReset());
    }
  }, [deleteSuccess, deleteError, dispatch, userId]);

  useEffect(() => {
    if (userId) {
      const currentMonth = new Date().toISOString().slice(0, 7);
      dispatch(
        seizureActions.fetchSeizureForecastRequest({
          id: userId,
          month: currentMonth,
        }),
      );
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (successMessage) {
      dispatch(seizureActions.resetSuccessMessage());
    }
  }, [successMessage]);

  const handleDeleteEvent = (eventId: string) => {
    dispatch(deleteSeizureActions.deleteSeizureRequest({ id: eventId }));
  };

  const handleEventPress = (item: SeizureEvent) => {
    navigation.navigate(
      RootStackRoutes.REPORT_SEIZURE_QUESTION_UPDATED_ONE_SCREEN,
      {
        seizureEvent: item,
      },
    );
  };

  const filteredEvents = selectedDate
    ? events.filter((event: SeizureEvent) => event.date === selectedDate)
    : events;

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
        text="common.seizure"
        textColor="purple1"
      />

      <EventCalendar
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      <CText style={styles.sectionTitle}>Seizure Events</CText>

      {loading || deleteLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <ScrollView style={styles.eventsContainer}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((item) => (
              <TouchableOpacity
                key={`${item.date}-${item.id}`}
                style={styles.eventItem}
                onPress={() => handleEventPress(item)}
              >
                <View style={styles.eventIcon}>
                  <CText style={styles.iconText}>⚡</CText>
                </View>
                <View style={styles.eventDetails}>
                  <CText style={styles.eventDate}>{item.date}</CText>
                  <CText style={styles.eventTime}>
                    {`From: ${item.time_from} To: ${item.time_to}`}
                  </CText>
                  <CText style={styles.eventDescription}>
                    {item.description}
                  </CText>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteEvent(item.id)}
                  style={styles.deleteButton}
                >
                  <Icon name="delete" size={24} color="#e74c3c" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <CText style={styles.emptyText}>
              No events available for this date
            </CText>
          )}
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    color: '#34495e',
  },
  eventsContainer: {
    width: '100%',
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#fce4ec',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  eventIcon: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
  },
  eventDetails: {
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 2,
  },
  eventDescription: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  deleteButton: {
    padding: 6,
  },
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 20,
  },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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

type EventData = {
  id: string;
  title: string;
  date: string;
  description: string;
  timeFrom: string;
  timeTo: string;
};

export const SeizureForecastScreen: React.FC<
  RootStackScreenProps<'SeizureForecastScreen'>
> = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(
    (state: RootState) => state.seizureForecast,
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Marked dates configuration
  const markedDates = events.reduce(
    (acc, event) => {
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

  // Populate `eventsData` directly from `events`
  const eventsData: EventData[] = events.map((event) => ({
    id: '',
    title: '',
    date: event.date,
    description: '',
    timeFrom: event.time_from || 'N/A', // Default to 'N/A' if not provided
    timeTo: event.time_to || 'N/A', // Default to 'N/A' if not provided
  }));

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

  // Determine which events to display based on selectedDate
  const filteredEvents = selectedDate
    ? eventsData.filter((event) => event.date === selectedDate)
    : eventsData; // Show all events initially

  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <Header hasBackButton text="common.seizure" />

      {/* Pass the onDayPress handler to EventCalendar */}
      <EventCalendar
        markedDates={markedDates}
        onDayPress={(day) => {
          console.log('Selected date:', day.dateString);
          setSelectedDate(day.dateString); // Update the selected date
        }}
      />

      <CText style={styles.sectionTitle}>Seizure Events</CText>
      <ScrollView style={styles.eventsContainer}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item, index) => (
            <View
              key={`${item.date}-${item.id || index}`}
              style={styles.eventItem}
            >
              <View style={styles.eventIcon}>
                <CText style={styles.iconText}>⚡</CText>
              </View>
              <View style={styles.eventDetails}>
                <CText style={styles.eventDate}>{item.date}</CText>
                <CText style={styles.eventTime}>
                  {`From: ${item.timeFrom || 'N/A'} To: ${item.timeTo || 'N/A'}`}
                </CText>
                <CText style={styles.eventDescription}>
                  {item.description || ''}
                </CText>
              </View>
            </View>
          ))
        ) : (
          <CText style={styles.emptyText}>
            No events available for this date
          </CText>
        )}
      </ScrollView>
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
  emptyText: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 20,
  },
});

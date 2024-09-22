import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Screen } from '@components/Screen';
import { EventCalendar } from '@components/EventCalendar';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';

export const SeizureForecastScreen: React.FC<
  RootStackScreenProps<'SeizureForecastScreen'>
> = () => {
  const markedDates = {
    '2024-08-20': { selected: true, marked: true, selectedColor: '#e74c3c' },
    '2024-08-21': { selected: true, marked: true, selectedColor: '#f1c40f' },
    '2024-08-22': { selected: true, marked: true, selectedColor: '#2ecc71' },
    '2024-08-23': { selected: true, marked: true, selectedColor: '#f1c40f' },
    '2024-08-25': { selected: true, marked: true, selectedColor: '#e74c3c' },
    '2024-09-01': { selected: true, marked: true, selectedColor: '#2ecc71' },
    '2024-09-03': { selected: true, marked: true, selectedColor: '#f1c40f' },
    '2024-09-05': { selected: true, marked: true, selectedColor: '#e74c3c' },
    '2024-09-07': { selected: true, marked: true, selectedColor: '#f1c40f' },
    '2024-09-10': { selected: true, marked: true, selectedColor: '#2ecc71' },
    '2024-09-15': { selected: true, marked: true, selectedColor: '#f1c40f' },
    '2024-09-20': { selected: true, marked: true, selectedColor: '#e74c3c' },
  };

  const events = [
    {
      id: '1',
      title: 'Seizure Alert',
      date: '2024-08-20',
      description: 'High risk of seizure today.',
    },
    {
      id: '2',
      title: 'Routine Check',
      date: '2024-08-21',
      description: 'Medium risk. Ensure medication adherence.',
    },
    {
      id: '3',
      title: 'Low Risk',
      date: '2024-08-22',
      description: 'Low risk, continue monitoring.',
    },
    {
      id: '4',
      title: 'Emergency Preparedness',
      date: '2024-08-23',
      description: 'High seizure risk, carry emergency medication.',
    },
    {
      id: '5',
      title: 'Follow-Up Check',
      date: '2024-08-25',
      description: 'Medium risk, monitor symptoms.',
    },
    {
      id: '6',
      title: 'Stable Day',
      date: '2024-09-01',
      description: 'Low risk, stay consistent with medication.',
    },
    {
      id: '7',
      title: 'Routine Monitoring',
      date: '2024-09-03',
      description: 'Medium risk, review recent triggers.',
    },
    {
      id: '8',
      title: 'Medication Reminder',
      date: '2024-09-05',
      description: 'Ensure all medications are taken.',
    },
    {
      id: '9',
      title: 'Symptom Check',
      date: '2024-09-07',
      description: 'Monitor symptoms closely today.',
    },
    {
      id: '10',
      title: 'Follow-Up Appointment',
      date: '2024-09-10',
      description: 'Visit the doctor for a check-up.',
    },
    {
      id: '11',
      title: 'Trigger Review',
      date: '2024-09-15',
      description: 'Review triggers from the past month.',
    },
    {
      id: '12',
      title: 'Emergency Drill',
      date: '2024-09-20',
      description: 'Practice emergency procedures with caregivers.',
    },
  ];

  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <Header hasBackButton text="common.seizure" />
      <EventCalendar markedDates={markedDates} />

      <CText style={styles.sectionTitle}>Seizure Events</CText>
      <ScrollView style={styles.eventsContainer}>
        {events.length > 0 ? (
          events.map((item) => (
            <View key={item.id} style={styles.eventItem}>
              <View style={styles.eventIcon}>
                <CText style={styles.iconText}>⚡</CText>
              </View>
              <View style={styles.eventDetails}>
                <CText style={styles.eventTitle}>{item.title}</CText>
                <CText style={styles.eventDate}>{item.date}</CText>
                <CText style={styles.eventDescription}>
                  {item.description}
                </CText>
              </View>
            </View>
          ))
        ) : (
          <CText style={styles.emptyText}>No events available</CText>
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
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#7f8c8d',
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

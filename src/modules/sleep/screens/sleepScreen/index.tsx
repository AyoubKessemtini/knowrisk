import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { NotesList } from '@components/Notes/NotesList';

export const SleepScreen: React.FC = () => {
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      {/* <MainHeader firstName="Aziz" lastName="Sassi" /> */}
      <View style={styles.wrapper}>
        <NotesList />
        {/* <NotesListReader /> */}

        {/* <ReportSeizureCard onPress={() => {}} /> */}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
  },
});

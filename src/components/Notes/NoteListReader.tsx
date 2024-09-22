import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { pallete, PalleteColors } from '@constants/Colors';
import { CText } from '../CText';
import { Notes } from './Notes';
import Entypo from 'react-native-vector-icons/Entypo';
import { CImage } from '../CImage';
import ImageAssets from '@assets/images';

const { height } = Dimensions.get('window');

interface NotesListReaderProps {
  color?: PalleteColors;
}

const notes = [
  {
    title: 'First Note',
    time: '10:00 AM',
    description: 'This is the first note description.',
  },
  {
    title: 'Second Note',
    time: '11:30 AM',
    description: 'This is the second note description.',
  },
];

export const NotesListReader: React.FC = ({
  color = 'purpleGrey',
}: NotesListReaderProps) => {
  const backgroundColor = pallete[color];
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CImage source={ImageAssets.NOTES_ICON} height={20} width={20} />
          <CText
            text="notes.doctor_notes"
            size="sm_bold"
            color="white"
            style={{ marginLeft: 8 }}
          />
        </View>
        <Entypo name="dots-three-vertical" color="white" size={14} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.notesContainer}
      >
        {notes.length === 0 ? (
          <CText text="notes.empty" size="md_bold" color="white" isCentered />
        ) : (
          notes.map((note, index) => (
            <TouchableOpacity key={index}>
              <Notes
                color="fadedPurple"
                title={note.title}
                time={note.time}
                description={note.description}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scrollView: {
    maxHeight: height * 0.216,
  },
  notesContainer: {
    paddingBottom: 10,
  },
});

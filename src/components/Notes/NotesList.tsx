import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import { Colors, pallete, PalleteColors } from '@constants/Colors';
import { CText } from '../CText';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { CImage } from '../CImage';
import ImageAssets from '@assets/images';

const { height } = Dimensions.get('window');

interface Note {
  title: string;
  time: string;
  description: string;
  type: 'patient' | 'doctor';
}

interface NotesListProps {
  color?: PalleteColors;
}

export const NotesList: React.FC<NotesListProps> = ({
  color = 'deepPurple',
}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      title: 'Doctor Visit Summary',
      time: '10:30 AM',
      description: 'The patient is responding well to the treatment.',
      type: 'doctor',
    },
    {
      title: 'Follow-up Required',
      time: '1:00 PM',
      description: 'Check blood pressure in one week.',
      type: 'doctor',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const getCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const addPatientNote = () => {
    const newNote: Note = {
      title: newTitle,
      time: getCurrentTime(),
      description: newDescription,
      type: 'patient',
    };

    setNotes([...notes, newNote]);
    setModalVisible(false);
    setNewTitle('');
    setNewDescription('');
  };

  const backgroundColor = pallete[color];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CImage source={ImageAssets.NOTES_ICON} height={20} width={20} />
          <CText
            text="notes.notes"
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
            <View
              key={index}
              style={
                note.type === 'patient' ? styles.patientNote : styles.doctorNote
              }
            >
              <CText size="md_bold" color="white">
                {note.title}
              </CText>
              <CText size="sm" color="white">
                {note.time}
              </CText>
              <CText size="sm" color="white">
                {note.description}
              </CText>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <CText text="notes.add" color="white" size="sm_medium" />
        <AntIcon name="plus" color="white" size={16} />
      </TouchableOpacity>

      {/* Add Note Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CText text="notes.add" isCentered size="md_bold" mb={15} />
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              multiline={true}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Note" onPress={addPatientNote} />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
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
    minHeight: height * 0.216,
  },
  notesContainer: {
    paddingBottom: 10,
  },
  addButton: {
    backgroundColor: Colors.lowDeepPurple,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.lowOpacityBlack,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 80,
  },
  patientNote: {
    backgroundColor: Colors.purpleGrey,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  doctorNote: {
    backgroundColor: Colors.fadedPurple,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

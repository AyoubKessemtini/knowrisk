import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-easy-icon';

interface Journal {
  id: number;
  title: string;
  content: string;
  date: string;
}

const mockJournals: Journal[] = [
  {
    id: 1,
    title: 'Journal Entry 1',
    content: 'Content of journal entry 1.',
    date: '2024-09-19',
  },
  {
    id: 2,
    title: 'Journal Entry 2',
    content: 'Content of journal entry 2.',
    date: '2024-09-18',
  },
  // Add more mock data as needed
];

export const Journal: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>(mockJournals);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newJournal, setNewJournal] = useState<Journal>({
    id: 0,
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleAddJournal = () => {
    setIsAdding(true);
    setIsModalVisible(true);
  };

  const handleSaveJournal = () => {
    setJournals([...journals, { ...newJournal, id: Date.now() }].reverse());
    setIsModalVisible(false);
    setIsAdding(false);
    setNewJournal({
      id: 0,
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setNewJournal({
      id: 0,
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CText mb={10} size="sm_semiBold" color="white">
          Journal
        </CText>
        <Icon
          type="entypo"
          name="dots-three-horizontal"
          size={20}
          color={Colors.white}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {journals.slice(0, 2).map((journal) => (
          <TouchableOpacity
            key={journal.id}
            style={styles.card}
            onPress={() => {
              setSelectedJournal(journal);
              setIsModalVisible(true);
            }}
          >
            <CText size="sm_bold" color="white">
              {journal.title}
            </CText>
            <CText style={styles.date}>{journal.date}</CText>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddJournal}>
          <Text style={styles.addButtonText}>+ Add Journal</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          {isAdding ? (
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor={Colors.grey1}
                value={newJournal.title}
                onChangeText={(text) =>
                  setNewJournal({ ...newJournal, title: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Content"
                placeholderTextColor={Colors.grey1}
                multiline
                value={newJournal.content}
                onChangeText={(text) =>
                  setNewJournal({ ...newJournal, content: text })
                }
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveJournal}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            selectedJournal && (
              <View style={styles.modalContent}>
                <CText size="lg_bold" color="black">
                  {selectedJournal.title}
                </CText>
                <CText style={styles.modalDate}>{selectedJournal.date}</CText>
                <CText style={styles.modalContentText}>
                  {selectedJournal.content}
                </CText>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple2,
    borderRadius: 16,
    paddingBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.purple2,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: Colors.white + '60',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
  },
  date: {
    fontSize: 14,
    color: Colors.grey1,
  },
  addButton: {
    backgroundColor: Colors.white + '60',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },

  modalDate: {
    fontSize: 16,
    color: Colors.grey1,
    marginBottom: 16,
  },
  modalContentText: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
    padding: 10,
    marginBottom: 16,
    width: '100%',
  },
  saveButton: {
    backgroundColor: Colors.purple2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: Colors.purple2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

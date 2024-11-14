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
  Alert,
} from 'react-native';
import { Colors } from '@constants/Colors';
import { CText } from '../CText';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { MedicationCard } from './MedicationCard'; // Import your MedicationCard component
import ImageAssets from '@assets/images';
import { core } from '@config/Configuration.ts';

const { height } = Dimensions.get('window');

interface MedicationsListProps {
  medicationsData: Medication[];
}

export const MedicationsList: React.FC<MedicationsListProps> = ({
    medicationsData
                                          }) => {
  const [medications, setMedications] = useState<Medication[]>(medicationsData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newFrequency, setNewFrequency] = useState('');
  const [newScheduleMessage, setNewScheduleMessage] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMedicationIndex, setSelectedMedicationIndex] = useState<
    number | null
  >(null);


  const addMedication = async () => {
    if (newTitle && newDosage && newFrequency && newScheduleMessage) {
      const newMedication: Medication = {
        title: newTitle,
        dosage: newDosage,
        frequency: newFrequency,
        schedule_message: newScheduleMessage,
      };
      const ok = await core.addMedication.execute({
        medication: newMedication,
      });
      if (ok) {
        console.log('newMedication');
        console.log(newMedication);
        setMedications([...medications, newMedication]);
        setModalVisible(false);
        clearInputs();
      } else {
        Alert.alert(
          'Error',
          'Error while adding medication, please try again.',
        );
      }
    }
  };

  const clearInputs = () => {
    setNewTitle('');
    setNewDosage('');
    setNewFrequency('');
    setNewScheduleMessage('');
  };

   const  deleteMedication = async () => {
    if (selectedMedicationIndex !== null) {
      const updatedMedications = medications.filter(
        (_, index) => index !== selectedMedicationIndex,
      );
      const ok = await core.deleteMedication.execute({
        id: medications[selectedMedicationIndex].id,
      });
      if (ok) {
        setMedications(updatedMedications);
        setDeleteModalVisible(false);
      } else {
        Alert.alert('Error', 'Error while deleting medication.');
      }
    }
  };

  const handleMedicationPress = (index: number) => {
    setSelectedMedicationIndex(index);
    setDeleteModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CText
            text="medication.medication"
            size="sm_bold"
            color="black"
            style={{ marginLeft: 8 }}
          />
        </View>
        <Entypo name="dots-three-vertical" color="black" size={14} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.notesContainer}
      >
        {medications.length === 0 ? (
          <CText
            text="medication.empty"
            size="md_bold"
            color="black"
            isCentered
          />
        ) : (
          medications.map((medication, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMedicationPress(index)}
            >
              <MedicationCard
                imageSource={ImageAssets.KEPPRA}
                title={medication.title}
                dosage={medication.dosage}
                frequency={medication.frequency}
                scheduleMessage={medication.schedule_message}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <CText text="medication.add" color="black" size="sm_medium" />
        <AntIcon name="plus" color="black" size={16} />
      </TouchableOpacity>

      {/* Add Medication Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CText text="medication.add" isCentered size="md_bold" mb={15} />
            <TextInput
              style={styles.input}
              placeholder="Medication Title"
              value={newTitle}
              placeholderTextColor={Colors.grey4}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              value={newDosage}
              placeholderTextColor={Colors.grey4}
              onChangeText={setNewDosage}
            />
            <TextInput
              style={styles.input}
              placeholder="Frequency"
              value={newFrequency}
              placeholderTextColor={Colors.grey4}
              onChangeText={setNewFrequency}
            />
            <TextInput
              style={styles.input}
              placeholder="Schedule Message"
              value={newScheduleMessage}
              placeholderTextColor={Colors.grey4}
              onChangeText={setNewScheduleMessage}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add" onPress={addMedication} />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Medication Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CText text="notes.delete" isCentered size="md_bold" mb={15} />
            <View style={styles.buttonContainer}>
              <Button title="Delete" onPress={deleteMedication} color="red" />
              <Button
                title="Cancel"
                onPress={() => setDeleteModalVisible(false)}
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
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.lotion,
    borderColor: Colors.fog,
    borderWidth: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollView: {
    maxHeight: height * 0.216,
    backgroundColor: Colors.white,
    marginTop: 10,
  },
  notesContainer: {
    marginTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: Colors.white,
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { pallete, PalleteColors } from '@constants/Colors';

export interface Note {
  title: string;
  time: string;
  description: string;
}

interface NotesProps extends Note {
  color?: PalleteColors;
}

export const Notes: React.FC<NotesProps> = ({
  title,
  time,
  description,
  color = 'lowDeepPurple',
}) => {
  const backgroundColor = pallete[color];
  return (
    <View style={[styles.noteContainer, { backgroundColor }]}>
      <TouchableOpacity style={styles.noteContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  noteContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  time: {
    fontSize: 14,
    color: '#dcdcdc',
  },
  description: {
    fontSize: 14,
    color: '#f1f1f1',
  },
});

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../constants/Colors';
import { CText } from '@components/CText';

interface HelpCenterButtonProps {
  onPress: () => void;
}

const HelpCenterButton: React.FC<HelpCenterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <CText size={'md_medium'} text="profile.help_center" color="black" />
        <CText
          size={'xm_medium'}
          text="common.contact_email"
          color="fadedPurple"
        />
      </View>
      <Feather name="help-circle" size={21} color={Colors.fog} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.magnolia,
  },
});

export default HelpCenterButton;

import { Screen } from '@components/Screen';
import { Colors } from '@constants/Colors';
import { TabStackScreenProps } from '@navigators/stacks/TabNavigator';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const Profile = ({}: TabStackScreenProps<'profile'>): JSX.Element => {
  return (
    <Screen containerStyles={styles.container}>
      <Text style={styles.textStyle}>PROFILE</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

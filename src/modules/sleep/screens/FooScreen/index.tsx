import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import { FooStackScreenProps } from '@navigators/stacks/FooNavigator';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface Props extends FooStackScreenProps<'FooScreen'> {
  someProp?: boolean;
}

export const FooScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <CText text="common.continue" />
      <Button onPress={() => navigation.navigate('BooScreen')} title="CLICK" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});

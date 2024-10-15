import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import Icon from 'react-native-easy-icon';

interface BleutoothStateButtonProps {
  connected: boolean;
  onPress: () => void;
}

export const BleutoothStateButton = ({
  connected,
  onPress,
}: BleutoothStateButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: connected ? Colors.lightGreen : Colors.lightRed },
      ]}
    >
      {connected ? (
        <Icon type="material" name="bluetooth" size={20} color={Colors.green} />
      ) : (
        <Icon
          type="material"
          name="bluetooth-disabled"
          size={20}
          color={Colors.red}
        />
      )}

      <View
        style={[
          styles.chipContainer,
          { backgroundColor: connected ? Colors.lightGreen : Colors.lightRed2 },
        ]}
      >
        <CText
          text={connected ? 'wearable.connected' : 'wearable.click_to_connect'}
          size="xm_medium"
          color={connected ? 'green' : 'white'}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 8,
    paddingLeft: 14,
    borderRadius: 24,
    backgroundColor: Colors.lightRed,
    gap: 5,
  },

  chipContainer: {
    backgroundColor: Colors.lightRed2,
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});

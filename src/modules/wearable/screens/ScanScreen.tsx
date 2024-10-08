// ScanScreen.tsx

import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { Screen } from '@components/Screen';
//import { CImage } from '@components/CImage';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
//import ImageAssets from '@assets/images';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { useBle } from '@hooks/useBle.ts';

export const ScanScreen = ({}: RootStackScreenProps<'scanScreen'>) => {
  const { allDevices, scanForPeripherals, connectToDevice } = useBle();

  useEffect(() => {
    scanForPeripherals();
  }, []);

  return (
    <Screen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <Header
        hasBackButton
        useCustomBackButton
        text="wearable.scan_device"
        textColor="black"
      />

      {allDevices.length > 0 ? (
        // Show list of discovered devices
        <FlatList
          data={allDevices}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.deviceItem}>
              <CText>{item.name || 'Unnamed Device'}</CText>
              <Button title="Connect" onPress={() => connectToDevice(item)} />
            </View>
          )}
        />
      ) : (
        // Show no devices found message
        <View style={styles.centerContent}>
          <CText>No devices found.</CText>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

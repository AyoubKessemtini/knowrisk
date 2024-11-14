import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Screen } from '@components/Screen';
import { CImage } from '@components/CImage';
import { CText } from '@components/CText';
import { Header } from '@components/Headers/Header';
import ImageAssets from '@assets/images';
import { RootStackScreenProps } from '@navigators/stacks/RootNavigator';
import { useBle } from '@hooks/useBle.ts';
import Icon from 'react-native-easy-icon';
import { Colors } from '@constants/Colors.ts';
import { TabBarStackRoutes } from '@navigators/routes.ts';
import { CButton } from '@components/Buttons/CButton.tsx';
import { useNavigation } from '@react-navigation/native';

export const ScanScreen = ({}: RootStackScreenProps<'scanScreen'>) => {
  const { devices, isScanning, startScan, connectToDevice } = useBle();
  const navigation = useNavigation();

  useEffect(() => {
    startScan();
  }, []);

  // Filter devices whose names start with "J2"
  const filteredDevices = devices.filter(
      (device) => device.name?.startsWith('J2')
  );

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

        {isScanning ? (
            // Show scanning indicator
            <View style={styles.centerContent}>
              <CText size="sm" text="wearable.scanning" mt={30} mb={120} />
              <CImage
                  source={ImageAssets.SCAN_IN_PROGRESS}
                  width={120}
                  height={120}
              />
            </View>
        ) : filteredDevices.length > 0 ? (
            // Show list of filtered devices
            <View>
              <CText
                  size="lg"
                  color={'grey2'}
                  mb={5}
                  text="wearable.available_devices"
              />
              <FlatList
                  data={filteredDevices}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                  renderItem={({ item }) => (
                      <View style={styles.listContainer}>
                        <CButton
                            stringText={item.name || 'Unknown Device'}
                            buttonType="magnolia"
                            buttonVersion={2}
                            rightAccessory={
                              <Icon
                                  type="material"
                                  name="chevron-right"
                                  size={30}
                                  color={Colors.fog}
                              />
                            }
                            leftAccessory={
                              <Icon
                                  type="ionicon"
                                  name="watch-outline"
                                  size={35}
                                  color={'darkPurple'}
                              />
                            }
                            onPress={async () => {
                              await connectToDevice(item.id);
                              await navigation.navigate(TabBarStackRoutes.HOME);
                            }}
                        />
                      </View>
                  )}
              />
            </View>
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
    paddingHorizontal: 25,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 5,
  },
});

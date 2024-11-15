// src/screens/GifScreenGuide.tsx

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import GifDisplay from './components/GifDisplay';
import ImageAssets from '@assets/images';
import { RootStackRoutes } from '@navigators/routes';
import { PersistenceStorage } from '@storage/index';
import {
  useNavigation,
  NavigationProp,
  StackActions,
} from '@react-navigation/native';
import { RootStackParamList } from '@navigators/stacks/RootNavigator';

const GIF_DISPLAYED_KEY = 'hasSeenGif';

const GifScreenGuide: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const checkGifDisplayed = async () => {
      try {
        const hasSeenGif = await PersistenceStorage.getItem(GIF_DISPLAYED_KEY);
        if (hasSeenGif) {
          // Navigate immediately if the GIF has been displayed before
          navigation.dispatch(StackActions.replace(RootStackRoutes.TAB_STACK));
        } else {
          // Display the GIF for 20 seconds, then navigate
          timer = setTimeout(async () => {
            await PersistenceStorage.setItem(GIF_DISPLAYED_KEY, 'true');
            navigation.dispatch(
              StackActions.replace(RootStackRoutes.TAB_STACK),
            );
          }, 20000); // 20 seconds
        }
      } catch (error) {
        console.error('Error checking GIF display status:', error);
        // Navigate to the main screen to prevent being stuck
        navigation.dispatch(StackActions.replace(RootStackRoutes.TAB_STACK));
      }
    };

    checkGifDisplayed();

    return () => {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <GifDisplay source={ImageAssets.Intro_GIF} />
      <View style={styles.buttonContainer}>
        {/* Add your buttons here if needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default GifScreenGuide;

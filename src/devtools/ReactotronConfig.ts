/* eslint-disable @typescript-eslint/no-var-requires */
import { goBack, resetRoot } from '../navigators/NavigationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistenceStorage } from '@storage/index';
import { Reactotron } from './ReactotronClient';
import { KEYS } from '@storage/Keys';

export const reactotron = Reactotron.configure({
  name: require('../../package.json').name,
  onConnect: () => Reactotron.clear(),
});

reactotron.setAsyncStorageHandler?.(AsyncStorage);
reactotron.useReactNative({
  networking: { ignoreUrls: /symbolicate/ },
});

reactotron.onCustomCommand({
  title: 'Reset Navigation State',
  description: 'Resets the navigation state',
  command: 'resetNavigation',
  handler: () => {
    Reactotron.log('resetting navigation state');
    resetRoot({ index: 0, routes: [] });
  },
});

reactotron.onCustomCommand({
  title: 'Reset MMKV Storage',
  description: 'Resets the MMKV storage',
  command: 'resetStore',
  handler: () => {
    Reactotron.log('[RESETTING MMKV]');
    PersistenceStorage.clearAll();
  },
});

reactotron.onCustomCommand({
  title: 'Go Back',
  description: 'Goes back',
  command: 'goBack',
  handler: () => {
    Reactotron.log('Going back');
    goBack();
  },
});

reactotron.onCustomCommand({
  title: 'Check access token',
  description: 'Get access token from storage',
  command: 'checkToken',
  handler: () => {
    Reactotron.log('Checking token');
    PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  },
});

/**
 *
 * if (__DEV__) {
 *  console.tron.display({
 *    name: 'JOKE',
 *    preview: 'What's the best thing about Switzerland?',
 *    value: 'I don't know, but the flag is a big plus!',
 *    important: true
 *  })
 * }
 * ```
 */
console.tron = reactotron;

reactotron.connect();

// Vos importations existantes
// ...
if (__DEV__) {
  require('./devtools/ReactotronConfig');
}
import { CStatusBar } from '@components/CStatusBar';
import { deepLinkConfig } from '@navigators/DeepLinkConfig';
import { Fallback } from '@navigators/error-boundary/Fallback';
import {
  navigationRef,
  useNavigationPersistance,
} from '@navigators/NavigationUtils';
import { RootNavigator } from '@navigators/stacks/RootNavigator';
import { PersistQueryClientProvider } from '@query/PersistQueryProvider';
import { persistOptions, queryClient } from '@query/queryClient';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SheetProvider } from 'react-native-actions-sheet';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import './lib/sheets';
import { store } from './store';
import { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  Platform,
  Linking,
  StyleSheet,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import compareVersions from 'compare-versions'; // Assurez-vous que esModuleInterop est activé dans tsconfig.json
import { TouchableWithoutFeedback } from 'react-native';
const NAVIGATION_KEY = 'NAVIGATION_PERSISTENCE_KEY';

function App() {
  const {
    onNavigationStateChange,
    initialNavigation,
    restoreState: isRestored,
  } = useNavigationPersistance(NAVIGATION_KEY);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        // Obtenir la version locale
        //   const localVersion = DeviceInfo.getVersion(); // Par exemple, "1.0.0"
        const localVersion = '25.1.3'; // Par exemple, "1.0.0"

        // Faire une requête à votre API pour obtenir la dernière version
        const response = await axios.get(
          'https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net/api/users/version',
        ); // Remplacez par votre URL d'API
        const latestVersion = response.data.version;

        console.log('localVersion', localVersion);
        console.log('latestVersion', latestVersion);
        console.log(
          'compareVersions.compare(latestVersion, localVersion, ">")',
          compareVersions.compare(latestVersion, localVersion, '>'),
        );
        // Comparer les versions
        if (compareVersions.compare(latestVersion, localVersion, '>')) {
          // latestVersion est supérieure à localVersion
          setShowUpdateModal(true);
        }
      } catch (error) {
        console.error(
          'Erreur lors de la vérification de la mise à jour :',
          error,
        );
      }
    };

    checkForUpdate();
  }, []);

  // Fonction pour ouvrir le store
  const openStore = () => {
    const url =
      Platform.OS === 'ios'
        ? 'https://testflight.apple.com/join/b2Bv3sUM' // Remplacez par votre ID d'application iOS
        : 'market://details?id=VotrePackageName'; // Remplacez par le nom de package Android

    Linking.openURL(url).catch((err) =>
      console.error("Erreur lors de l'ouverture du store :", err),
    );
  };

  if (!isRestored) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={persistOptions}
            onSuccess={() =>
              setTimeout(() => RNBootSplash.hide({ fade: true }), 1000)
            }
          >
            <ThemeProvider>
              <ErrorBoundary FallbackComponent={Fallback}>
                <SheetProvider>
                  <NavigationContainer
                    linking={deepLinkConfig}
                    ref={navigationRef}
                    initialState={initialNavigation}
                    onStateChange={onNavigationStateChange}
                  >
                    <RootNavigator />
                    <CStatusBar />
                  </NavigationContainer>
                  {/* Modal de mise à jour */}
                  <Modal
                    visible={showUpdateModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => {
                      // Si vous voulez fermer le modal en appuyant sur le bouton "Retour" sur Android
                      setShowUpdateModal(false);
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => setShowUpdateModal(false)}
                    >
                      <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                          <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>
                              Mise à jour disponible
                            </Text>
                            <Text style={styles.modalMessage}>
                              Une nouvelle version de l'application est
                              disponible. Veuillez la mettre à jour pour
                              continuer.
                            </Text>
                            <Button title="Mettre à jour" onPress={openStore} />
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
                </SheetProvider>
              </ErrorBoundary>
            </ThemeProvider>
          </PersistQueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

// Styles
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 5, // Pour l'ombre sur Android
    shadowColor: '#000', // Pour l'ombre sur iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});

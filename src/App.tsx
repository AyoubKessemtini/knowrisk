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

const NAVIGATION_KEY = 'NAVIGATION_PERSISTENCE_KEY';

function App() {
  const {
    onNavigationStateChange,
    initialNavigation,
    restoreState: isRestored,
  } = useNavigationPersistance(NAVIGATION_KEY);

  if (!isRestored) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView>
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

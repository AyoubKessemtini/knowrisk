import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface AppStateSettings {
  onChange?: (status: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

export const useAppState = ({
  onChange,
  onForeground,
  onBackground,
}: AppStateSettings) => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      setAppState((prevAppState) => {
        if (nextAppState === 'active' && prevAppState !== 'active') {
          onForeground && onForeground();
        } else if (
          prevAppState === 'active' &&
          nextAppState.match(/inactive|background/)
        ) {
          onBackground && onBackground();
        }
        return nextAppState;
      });
      onChange && onChange(appState);
    }
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => appStateListener.remove();
  }, [onChange, onForeground, onBackground, appState]);

  return { appState };
};

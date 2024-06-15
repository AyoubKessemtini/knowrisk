import { Configuration } from '@config/Configuration';
import {
  NavigationState,
  PartialState,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { PersistenceStorage } from '@storage/index';
import { useIsMounted } from '@hooks/useIsMounted';
import { useEffect, useRef, useState } from 'react';
import { NavigationProps } from './navigationTypes';
import { RootStackParamList } from './stacks/RootNavigator';
import { BaseConfigurationProps, PersistNavigationEnum } from '@core/build';
import { IS_DEV } from '@utils/platform';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
): string {
  const route = state.routes[state.index ?? 0];

  if (!route.state) return route.name as keyof RootStackParamList;

  return getActiveRouteName(route.state as NavigationState<RootStackParamList>);
}

export const getRouteName = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    return navigationRef.goBack();
  }
};

export const resetRoot = (
  state: Parameters<typeof navigationRef.resetRoot>[0] = {
    index: 0,
    routes: [],
  },
) => {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
};

const shouldRestoreNavigationState = (
  persistNav: BaseConfigurationProps['persistNav'],
): boolean => {
  if (persistNav === PersistNavigationEnum.DEV && IS_DEV) return true;
  if (persistNav === PersistNavigationEnum.PROD && !IS_DEV) return true;

  return true;
};

export const useNavigationPersistance = (persistenceKey: string) => {
  const [initialNavigation, setInitialNavigation] =
    useState<NavigationProps['initialState']>();

  const shouldRestore = shouldRestoreNavigationState(Configuration.persistNav);
  const [stateRestored, setStateRestored] = useState(shouldRestore);

  const routeRef = useRef<keyof RootStackParamList | undefined>();

  const isMounted = useIsMounted();

  const onNavigationStateChange = (state: NavigationState | undefined) => {
    const previousRouteName = routeRef.current;
    if (state !== undefined) {
      const currRoute = getActiveRouteName(state);

      if (previousRouteName !== currRoute) {
        if (IS_DEV) {
          console.log('[CURRENT ROUTE]:', currRoute);
        }
      }

      routeRef.current = currRoute as keyof RootStackParamList;

      PersistenceStorage.setItem(persistenceKey, state);
    }
  };

  const restoreState = () => {
    try {
      const state = PersistenceStorage.getItem(persistenceKey) as
        | NavigationProps['initialState']
        | null;

      if (state) {
        setInitialNavigation(state);
      }
    } finally {
      if (isMounted()) {
        setStateRestored(true);
      }
    }
  };

  useEffect(() => {
    if (!stateRestored) {
      restoreState();
    }
  }, [stateRestored]);

  return {
    onNavigationStateChange,
    restoreState,
    stateRestored,
    initialNavigation,
  };
};

import {
  IsRestoringProvider,
  QueryClientProvider,
  QueryClientProviderProps,
  focusManager,
} from '@tanstack/react-query';
import {
  PersistQueryClientOptions,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import React, { useEffect, useRef, useState } from 'react';
import { AppStateStatus, Platform } from 'react-native';
import { persistOptions } from './queryClient';
import { useOnlineManager } from './useOnlineManager';
import { useAppState } from '@hooks/useAppState';

export type PersistQueryClientProviderProps = QueryClientProviderProps & {
  persistOptions: Omit<PersistQueryClientOptions, 'queryClient'>;
  onSuccess?: () => void;
};

export const PersistQueryClientProvider = ({
  children,
  onSuccess,
  client,
  ...props
}: PersistQueryClientProviderProps): JSX.Element => {
  const [isRestoring, setIsRestoring] = useState(true);
  const refs = useRef({ persistOptions, onSuccess });

  useOnlineManager();

  //REFETCH ON APP FOCUS
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }
  useAppState({ onChange: onAppStateChange });
  /*---------------------------*/

  useEffect(() => {
    refs.current = { persistOptions, onSuccess };
  });

  useEffect(() => {
    let isStale = false;
    setIsRestoring(true);
    const [unsubscribe, promise] = persistQueryClient({
      ...refs.current.persistOptions,
      queryClient: client,
    });

    promise.then(() => {
      if (!isStale) {
        refs.current.onSuccess?.();
        setIsRestoring(false);
      }
    });

    return () => {
      isStale = true;
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={client} {...props}>
      <IsRestoringProvider value={isRestoring}>{children}</IsRestoringProvider>
    </QueryClientProvider>
  );
};

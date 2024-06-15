import { PersistenceStorage } from '@storage/index';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import {
  PersistQueryClientOptions,
  removeOldestQuery,
} from '@tanstack/react-query-persist-client';
import { QueryCache } from '@tanstack/react-query';

const FIVE_DAYS = 1000 * 60 * 60 * 24 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: FIVE_DAYS,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.withError) {
        //Show Toast?
        //console.log('ERROR FROM CACHE', error.message);
        return;
      }
    },
  }),
});

const clientPersister = createSyncStoragePersister({
  storage: PersistenceStorage,
  retry: removeOldestQuery,
});

export const persistOptions: PersistQueryClientOptions = {
  queryClient,
  persister: clientPersister,
  maxAge: FIVE_DAYS,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => Boolean(query.gcTime !== 0),
  },
};

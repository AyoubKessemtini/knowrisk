import { KEYS } from './Keys';

export interface PersistenceService<K = KEYS, T = unknown> {
  setItem(key: K, value: T): void;
  getItem(key: K): T | undefined;
  removeItem(key: K): void;
  clearAll(): void;
}

import { MMKV } from 'react-native-mmkv';
import { KEYS } from './Keys';
import { PersistenceService } from './type';

export class Storage implements PersistenceService {
  protected store: MMKV;

  constructor() {
    this.store = new MMKV({
      id: 'user-storage',
      encryptionKey: 'mB8ZYswdEf',
    });
  }

  setItem(key: KEYS | string, value: unknown): void {
    this.store.set(key, JSON.stringify(value));
  }

  getItem(key: KEYS | string): string | null {
    const res = this.store.getString(key);
    if (!res) return null;
    return JSON.parse(res);
  }

  removeItem(key: KEYS | string): void {
    this.store.delete(key);
  }

  clearAll(): void {
    this.store.clearAll();
  }
}

export const PersistenceStorage = new Storage();

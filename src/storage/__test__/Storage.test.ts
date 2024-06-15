import { PersistenceStorage, Storage } from '..';

const MOCKED_STRING_KEY = 'mockedString';
const MOCKED_NUMBER_KEY = 'mockedNumber';
const MOCKED_BOOLEAN_KEY = 'mockedBoolean';

describe('[STORAGE MMKV]', () => {
  let storage: Storage;

  beforeAll(() => {
    storage = PersistenceStorage;
  });

  it('functions correctly', () => {
    storage.setItem(MOCKED_STRING_KEY, 'value');
    expect(storage.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');

    storage.setItem(MOCKED_NUMBER_KEY, 99);
    expect(storage.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');
    expect(storage.getItem(MOCKED_NUMBER_KEY)).toStrictEqual(99);

    storage.setItem(MOCKED_BOOLEAN_KEY, false);
    expect(storage.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');
    expect(storage.getItem(MOCKED_NUMBER_KEY)).toStrictEqual(99);
    expect(storage.getItem(MOCKED_BOOLEAN_KEY)).toStrictEqual(false);

    storage.removeItem(MOCKED_BOOLEAN_KEY);
    expect(storage.getItem(MOCKED_BOOLEAN_KEY)).toBeNull();
    expect(storage.getItem(MOCKED_STRING_KEY)).toStrictEqual('value');

    storage.clearAll();
    expect(storage.getItem(MOCKED_NUMBER_KEY)).toBeNull();
    expect(storage.getItem(MOCKED_STRING_KEY)).toBeNull();
  });
});

import { i18n } from '@i18n';
import { KEYS } from '@storage/Keys';
import { PersistenceStorage } from '@storage/index';
import { store } from '@store/index';
import { LocaleActions } from '@store/localeSlice';
import { Languages } from 'src/i18n/types';

jest.mock('@storage/index', () => ({
  PersistenceStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
}));

jest.mock('@i18n', () => ({
  i18n: {
    locale: '',
  },
}));

describe('[STORE]: Locale Slice', () => {
  it('Should match initial state', () => {
    const state = store.getState().locale;
    expect(state.selectedLocale).toEqual(undefined);
  });

  it('Should set setLocale correctly', () => {
    const mockLocale = Languages.FR;

    const result = store.dispatch(LocaleActions.setLocale(mockLocale));
    const state = store.getState().locale;

    expect(result.payload).toBe(mockLocale);
    expect(state.selectedLocale).toEqual(mockLocale);
    expect(i18n.locale).toEqual(mockLocale);
    expect(PersistenceStorage.setItem).toHaveBeenCalledWith(
      KEYS.LOCALE,
      mockLocale,
    );
  });
});

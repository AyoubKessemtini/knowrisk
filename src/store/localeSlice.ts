import { i18n } from '@i18n';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KEYS } from '@storage/Keys';
import { PersistenceStorage } from '@storage/index';
import { Languages } from 'src/i18n/types';

interface LocaleState {
  selectedLocale: Languages | undefined;
}

const initialState: LocaleState = {
  selectedLocale: undefined,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, { payload }: PayloadAction<Languages>) => {
      i18n.locale = payload;
      PersistenceStorage.setItem(KEYS.LOCALE, payload);
      state.selectedLocale = payload;
    },
  },
});

export const LocaleActions = localeSlice.actions;

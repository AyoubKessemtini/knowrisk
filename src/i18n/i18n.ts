import type { Locale } from 'date-fns';
import { enUS as enDates, fr as frDates } from 'date-fns/locale';
import lang, { I18n } from 'i18n-js';
import en from './en.json';
import fr from './fr.json';
import { I18nKeyPath, Languages } from './types';
import { Platform, NativeModules } from 'react-native';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';

//CONFIGURE i18n
export const i18n = new I18n({ en, fr });

i18n.defaultLocale = Languages.FR;
i18n.enableFallback = true;

//-------------------//

const systemLocale = Platform.select({
  ios:
    NativeModules.SettingsManager?.settings?.AppleLocale ||
    NativeModules.SettingsManager?.settings?.AppleLanguages[0],
  android: NativeModules.I18nManager.localeIdentifier,
});

const selectedLocale = PersistenceStorage.getItem(KEYS.LOCALE);
const USE_SINGLE_LOCALE = true;

if (USE_SINGLE_LOCALE) {
  i18n.locale = Languages.FR;
} else if (selectedLocale) {
  i18n.locale = selectedLocale;
} else if (
  Object.prototype.hasOwnProperty.call(i18n.translations, systemLocale)
) {
  i18n.locale = systemLocale;
} else {
  const unSuffixedLocate = systemLocale?.split('-')[0];
  if (
    Object.prototype.hasOwnProperty.call(i18n.translations, unSuffixedLocate)
  ) {
    i18n.locale = unSuffixedLocate;
  } else {
    i18n.locale = Languages.FR;
  }
}

export const getLocale = (): Locale => {
  const locale = i18n.locale.split('-')[0];
  switch (locale) {
    case 'fr':
      return frDates;
    case 'en':
    default:
      return enDates;
  }
};

export const t = (
  keypath: I18nKeyPath,
  arg?: lang.TranslateOptions,
): string => {
  return i18n.t(keypath, arg);
};

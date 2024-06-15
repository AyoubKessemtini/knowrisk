/* eslint-disable @typescript-eslint/no-explicit-any */
import fr from './fr.json';

export type Translations = typeof fr;

export enum Languages {
  EN = 'en',
  FR = 'fr',
}

export type I18nKeyPath = RecursiveKeyOf<Translations>;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
    ? `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text;

import { GoodSheet } from '@components/Sheets/GoodSheet';
import { registerSheet } from 'react-native-actions-sheet';

export enum SheetsTypes {
  GOOD_SHEET = 'good-sheet',
}

registerSheet(SheetsTypes.GOOD_SHEET, GoodSheet);

export {};

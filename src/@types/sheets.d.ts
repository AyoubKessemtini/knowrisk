import {
  GoodSheetCallBack,
  GoodSheetPayload,
} from '@components/Sheets/GoodSheet';
import { SheetDefinition } from 'react-native-actions-sheet';
import { SheetsTypes } from 'src/lib/sheets';

declare module 'react-native-actions-sheet' {
  interface Sheets {
    [SheetsTypes.GOOD_SHEET]: SheetDefinition<{
      payload: GoodSheetPayload;
      returnValue: GoodSheetCallBack;
    }>;
  }
}

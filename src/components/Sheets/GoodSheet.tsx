import { CText } from '@components/CText';
import React from 'react';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { BaseActionSheet } from './BaseActionSheet';
import { CImage } from '@components/CImage';
import { CButton } from '@components/Buttons/CButton';
import { SheetsTypes } from 'src/lib/sheets';

export interface GoodSheetPayload {
  text: string;
}

export interface GoodSheetCallBack {
  text?: string;
  shouldNavigate?: boolean;
}

export const GoodSheet = ({
  sheetId,
  payload,
}: SheetProps<SheetsTypes.GOOD_SHEET>) => {
  return (
    <BaseActionSheet sheetId={sheetId}>
      <CText text="common.continue" size="lg_bold" isCentered mb={10} />
      <CText size="lg_bold" isCentered mb={10}>
        {payload?.text}
      </CText>
      <CImage
        source={
          'https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg'
        }
        height={150}
      />
      <CButton
        mt={10}
        mb={10}
        buttonType="success"
        text="common.apply"
        onPress={() =>
          SheetManager.hide(sheetId, {
            payload: { shouldNavigate: true },
          })
        }
      />
      <CButton
        buttonType="danger"
        text="common.continue"
        onPress={() =>
          SheetManager.hide(sheetId, {
            payload: { text: 'Some dynamic text' },
          })
        }
      />
    </BaseActionSheet>
  );
};

import { Colors } from '@constants/Colors';
import { useCTheme } from '@hooks/useCTheme';
import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import ActionSheet, {
  ActionSheetProps,
  SheetProps,
} from 'react-native-actions-sheet';

type BaseActionsSheetType = PropsWithChildren<SheetProps> & ActionSheetProps;

/**
 * Base ActionSheet component (`BaseActionSheet`)
 *
 * Usefull props:
 * @param {snapPoints} [props.snapPoints] - Snap points ranging from 0 to 100. Default 100
 * @param {initialSnapIndex} [props.initialSnapIndex] - Initial snap points for the sheet depending on snapPoints as index.
 * @link
 * https://rnas.vercel.app/reference/actionsheet
 */

export const BaseActionSheet = ({
  sheetId,
  children,
  ...actionSheetProps
}: BaseActionsSheetType) => {
  const { isLightTheme } = useCTheme();

  return (
    <ActionSheet
      useBottomSafeAreaPadding
      drawUnderStatusBar={false}
      statusBarTranslucent={false}
      headerAlwaysVisible
      gestureEnabled
      id={sheetId}
      defaultOverlayOpacity={0.45}
      indicatorStyle={styles.indicatorStyle}
      containerStyle={{
        ...styles.sheetContainer,
        backgroundColor: isLightTheme ? Colors.white : Colors.black1,
      }}
      {...actionSheetProps}
    >
      {children}
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: { paddingHorizontal: 16 },
  indicatorStyle: { marginBottom: 14, marginTop: 14 },
});

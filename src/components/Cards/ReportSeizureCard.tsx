import ImageAssets from '@assets/images';
import { CButton } from '@components/Buttons/CButton';
import { CImage } from '@components/CImage';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ReportSeizureCardProps {
  onPress: () => void;
}

export const ReportSeizureCard: React.FC<ReportSeizureCardProps> = ({
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <CImage source={ImageAssets.INFO_ICON} height={15} width={15} />
        <CText text="buttons.tap_to_report" color="deepPurple" size="sm" />
      </View>
      <CButton
        text="buttons.report"
        onPress={onPress}
        rightAccessory={
          <CImage source={ImageAssets.WARNING_ICON} height={25} width={25} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.midPurple,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    marginBottom: 15,
  },
});

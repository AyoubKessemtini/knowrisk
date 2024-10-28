import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@constants/Colors';
import { CText } from '@components/CText.tsx';
import CircularProgress from 'react-native-circular-progress-indicator';

interface CircularQualityCardProps {
  title: string;
  value: number;
  date: string;
}

export const CircularQualityCard: React.FC<CircularQualityCardProps> = ({
  title,
  value,
  date,
}) => {
  return (
    <View style={styles.container}>
      <CText mb={25} mt={10} size="sm_semiBold" color="black">
        {title}
      </CText>

      <CircularProgress
        value={value}
        maxValue={100}
        radius={45}
        showProgressValue={false}
        activeStrokeColor={'#2ecc71'}
        inActiveStrokeColor={'#c0e3cf'}
        inActiveStrokeOpacity={0.3}
        activeStrokeWidth={7}
        inActiveStrokeWidth={7}
        duration={1500}
        title={`${value} %`}
        titleColor={'#2ecc71'}
        titleStyle={styles.progressTitle}
      />

      <CText
        size="xs"
        color="grey4"
        mt={20}
        mb={10}
        text="home_screen.last_updated"
        textOptions={{ date }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: Colors.magnolia,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 18,
  },
});

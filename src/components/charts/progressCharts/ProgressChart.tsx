import { Colors } from '@constants/Colors';
import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: Colors.backgroundWhite,
  backgroundGradientFrom: Colors.backgroundWhite,
  backgroundGradientTo: Colors.backgroundWhite,
  decimalPlaces: 2,
  color: (index?: number) => {
    const ringColors = [Colors.backgroundBlack, Colors.deepRed, Colors.grey2];
    return ringColors[index! % ringColors.length];
  },
  labelColor: () => Colors.primaryBlack,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: Colors.deepRed,
  },
};

type ProgressChartData = {
  labels: string[];
  data: number[];
};

type ProgressChartComponentProps = {
  data: ProgressChartData;
  width?: number;
  height?: number;
  strokeWidth?: number;
  radius?: number;
  hideLegend?: boolean;
};

export const ProgressChartComponent: React.FC<ProgressChartComponentProps> = ({
  data,
  width = screenWidth,
  height = 220,
  strokeWidth = 15,
  radius = 22,
}) => {
  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        radius={radius}
        chartConfig={chartConfig}
        absolute
        hideLegend
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
});

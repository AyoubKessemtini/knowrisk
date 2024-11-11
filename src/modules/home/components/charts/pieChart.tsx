import React from 'react';
import { View } from 'react-native';
import { PieChart as ChartKitPieChart } from 'react-native-chart-kit';

interface PieChartData {
  name: string;
  value: number; // changed from string to number for chart compatibility
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ChartKitPieChart
        data={data.map((datum) => ({
          name: datum.name,
          population: datum.value, // Map 'value' to 'population' for chart data
          color: datum.color,
          legendFontColor: datum.color,
          legendFontSize: 12,
        }))}
        width={220} // Chart width
        height={100} // Chart height
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="1"
        center={[0, 0]} // Center the pie chart
        hasLegend={true}
        absolute // Show values as absolute numbers
      />
    </View>
  );
};

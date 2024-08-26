import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import dayjs from 'dayjs'; // Import dayjs for date formatting

interface HeartRateChartProps {
  data?: Array<{ value: number; startDate: string }>;
}

export const HeartRateChart: React.FC<HeartRateChartProps> = ({ data }) => {
  // Step 1: Process the data to show only a subset (e.g., one point per hour)
  const processedData = data?.filter((_, index) => index % 60 === 0) || [];

  // Format the data for the chart
  const chartData = processedData.map((item) => ({
    value: item.value,
    label: dayjs(item.startDate).format('HH:mm'), // Format time only
  }));

  // Determine the maximum value based on the data range
  const maxValue = Math.max(...chartData.map((item) => item.value), 0.1); // Ensure at least 0.1

  if (chartData.length === 0) {
    return (
      <View style={styles.container}>
        <CText style={styles.title}>Heart Rate</CText>
        <CText>No data available</CText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CText style={styles.title}>Heart Rate{data?.length}</CText>
      <LineChart
        data={chartData}
        thickness={2}
        color={Colors.deepRed}
        // hideRules
        // yAxisTextStyle={{ color: Colors.grey1 }}
        // initialSpacing={0} // Adjust spacing to fit all data points
        noOfSections={1}
        yAxisColor={Colors.grey1}
        xAxisColor={Colors.grey1}
        xAxisLabelTexts={chartData.map((d) => d.label)}
        maxValue={maxValue}
        height={120} // Set a fixed height for the chart
        // showTooltip // Enable tooltips
        // tooltipTextStyle={{ color: Colors.white }} // Tooltip text color
        // tooltipBackgroundColor={Colors.deepRed} // Tooltip background color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: Colors.backgroundWhite,
    // borderRadius: 8,
    marginVertical: 10,
    width: '100%',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.deepRed,
  },
});

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { CText } from '@components/CText';
import { Colors } from '@constants/Colors';
import dayjs from 'dayjs';

interface HeartRateChartProps {
  data?: Array<{ value: number; startDate: string }>;
  goal?: number;
}

const HEART_RATE_ZONES = [
  { label: 'Resting', min: 0, max: 60, color: Colors.blue },
  { label: 'Fat Burn', min: 61, max: 90, color: Colors.green },
  { label: 'Cardio', min: 91, max: 120, color: Colors.orange },
  { label: 'Peak', min: 121, max: 200, color: Colors.deepRed },
];

export const HeartRateChart: React.FC<HeartRateChartProps> = ({
  data = [],
  goal = 100,
}) => {
  const [selectedDataPoint, setSelectedDataPoint] = useState<{
    value: number;
    label: string;
  } | null>(null);

  const processedData = useMemo(() => {
    const totalPoints = 12;
    const interval = Math.max(Math.floor(data.length / totalPoints), 1);
    const chartData = data
      .filter((_, index) => index % interval === 0)
      .slice(0, totalPoints);

    if (chartData.length > 0) {
      if (chartData[0]?.startDate !== data[0]?.startDate) {
        chartData.unshift(data[0]);
      }
      if (
        chartData[chartData.length - 1]?.startDate !==
        data[data.length - 1]?.startDate
      ) {
        chartData.push(data[data.length - 1]);
      }
    }

    return chartData.map((item) => ({
      value: item.value,
      label: dayjs(item.startDate).format('HH:mm'),
    }));
  }, [data]);

  const averageHeartRate = useMemo(() => {
    if (processedData.length === 0) return 0;
    const total = processedData.reduce((sum, item) => sum + item.value, 0);
    return total / processedData.length;
  }, [processedData]);

  const timeInZones = useMemo(() => {
    const timeInZones = HEART_RATE_ZONES.map((zone) => ({
      ...zone,
      time: 0,
    }));

    data.forEach((item) => {
      const zone = timeInZones.find(
        (zone) => item.value >= zone.min && item.value <= zone.max,
      );
      if (zone) {
        zone.time += 1; // Assuming each point represents a minute
      }
    });

    return timeInZones;
  }, [data]);

  const maxHeartRate = useMemo(
    () => Math.max(...processedData.map((item) => item.value)),
    [processedData],
  );
  const minHeartRate = useMemo(
    () => Math.min(...processedData.map((item) => item.value)),
    [processedData],
  );

  if (processedData.length === 0) {
    return (
      <View style={styles.container}>
        <CText style={styles.title}>Heart Rate</CText>
        <CText>No data available</CText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CText style={styles.title}>Heart Rate</CText>
      <CText style={styles.average}>
        Average Heart Rate: {averageHeartRate.toFixed(1)} bpm
      </CText>
      <CText style={styles.summary}>
        Max Heart Rate: {maxHeartRate} bpm, Min Heart Rate: {minHeartRate} bpm
      </CText>
      {timeInZones.map((zone) => (
        <View key={zone.label} style={styles.zoneContainer}>
          <View style={[styles.zoneDot, { backgroundColor: zone.color }]} />
          <CText style={styles.zone}>
            {zone.label} Zone: {zone.time} mins
          </CText>
        </View>
      ))}
      <LineChart
        data={{
          labels: processedData.map((item, index) =>
            index === 0 || index === processedData.length - 1 || index % 2 === 0
              ? item.label
              : '',
          ),
          datasets: [
            {
              data: processedData.map((item) => item.value),
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={240}
        yAxisSuffix=" bpm"
        yAxisInterval={2}
        chartConfig={{
          backgroundColor: Colors.backgroundWhite,
          backgroundGradientFrom: Colors.backgroundWhite,
          backgroundGradientTo: Colors.backgroundWhite,
          decimalPlaces: 1,
          color: () => Colors.deepRed,
          labelColor: () => Colors.grey2,
          style: {
            borderRadius: 16,
            marginVertical: 8,
            borderWidth: 1,
            borderColor: Colors.grey2,
          },
          propsForLabels: {
            fontSize: 10,
            fontFamily: 'Arial',
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: Colors.deepRed,
          },
          propsForBackgroundLines: {
            strokeDasharray: '', // Solid lines
          },
        }}
        bezier
        style={styles.chart}
        onDataPointClick={(data) => {
          setSelectedDataPoint({
            value: data.value,
            label: 'Heart Rate',
          });
        }}
      />
      {selectedDataPoint && (
        <CText style={styles.tooltip}>
          {selectedDataPoint.label}: {selectedDataPoint.value} bpm
        </CText>
      )}
      {averageHeartRate < goal && (
        <CText style={styles.alert}>
          Heart rate below goal! Try to increase your intensity.
        </CText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundWhite,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
    width: '100%',
    borderRadius: 8,
    shadowColor: Colors.grey1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.deepRed,
    fontWeight: 'bold',
  },
  average: {
    fontSize: 14,
    marginBottom: 10,
    color: Colors.grey2,
  },
  summary: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.grey2,
  },
  zoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  zoneDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  zone: {
    fontSize: 12,
    color: Colors.grey2,
  },
  chart: {
    borderRadius: 16,
    marginRight: 20,
  },
  tooltip: {
    fontSize: 14,
    marginTop: 10,
    color: Colors.deepRed,
    textAlign: 'center',
  },
  alert: {
    fontSize: 14,
    marginTop: 10,
    color: Colors.deepRed,
    textAlign: 'center',
  },
});

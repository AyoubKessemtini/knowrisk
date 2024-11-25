import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { log } from 'react-native-bootsplash/dist/typescript/generate';

export const SleepStagesChart = ({ sleepData }) => {
  /*
    * const sleepData = {
        "date": "2024-10-16",
        "day": "Wed",
        "startSleep": "22:36",
        "endSleep": "00:21",
        "totalSleepDuration": "1h45",
        "sleepQualityScore": 33.33,
        "sleepQuality": "Poor",
        "sleepStages": [
            {
                "stage": "Awake",
                "percentage": 0,
                "duration": "0h10"
            },
            {
                "stage": "REM",
                "percentage": 0,
                "duration": "0h30"
            },
            {
                "stage": "Light Sleep",
                "percentage": 33.33,
                "duration": "2h35"
            },
            {
                "stage": "Deep Sleep",
                "percentage": 66.67,
                "duration": "0h55"
            },
            {
                "stage": "Light Sleep",
                "percentage": 33.33,
                "duration": "0h35"
            },
            {
                "stage": "Awake",
                "percentage": 0,
                "duration": "0h05"
            }
        ]
    };*/

  const colors = {
    REM: '#7B35DA',
    'Light Sleep': '#a468dc',
    'Deep Sleep': '#b58ad9',
    Nap: '#f0a500',
  };

  sleepData.sleepStages = sleepData.sleepStages.filter(
    (s) => s.stage !== 'Awake',
  );

  const stagesData = sleepData.sleepStages.map((stage) => {
    const durationParts = stage.duration.split('h');
    const hours = parseInt(durationParts[0], 10);
    const minutes = parseInt(durationParts[1] || '0', 10);
    const totalDuration = hours * 60 + minutes;
    return { stage: stage.stage, duration: totalDuration };
  });

  const totalDuration = stagesData.reduce(
    (sum, { duration }) => sum + duration,
    0,
  );
  const chartHeight = 120;
  const chartWidth = Dimensions.get('window').width - 180;

  const yPositions = {
    REM: 0,
    'Light Sleep': chartHeight * 0.33,
    'Deep Sleep': chartHeight * 0.67,
    Nap: chartHeight * 0.75,
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${remainingMinutes}m`;
  };

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 16 }}
    >
      <View
        style={{
          width: 80,
          gap: 25,
          justifyContent: 'space-between',
          marginRight: 16,
        }}
      >
        <Text style={{ color: colors.REM }}>REM</Text>
        <Text style={{ color: colors['Light Sleep'] }}>Light Sleep</Text>
        <Text style={{ color: colors['Deep Sleep'] }}>Deep Sleep</Text>
        {/* eslint-disable-next-line eqeqeq */}
        {sleepData.sleepStages.some(
          (stage) => stage.stage === 'Nap' && stage.percentage != 0,
        ) && <Text style={{ color: colors.Nap }}>Nap</Text>}
      </View>
      <Svg height={chartHeight} width={chartWidth}>
        {stagesData.map((data, index) => {
          const { stage, duration } = data;
          const x =
            stagesData
              .slice(0, index)
              .reduce((sum, item) => sum + item.duration, 0) *
            (chartWidth / totalDuration);
          const width = duration * (chartWidth / totalDuration);
          const y = yPositions[stage];

          // Add text element for duration
          return (
            <>
              <Rect
                key={index}
                x={x}
                y={y + (chartHeight / 4) * 0.4}
                width={width}
                height={4}
                fill={colors[stage]}
              />
              <SvgText
                x={x + width / 2}
                y={y + (chartHeight / 4) * 0.4 + 15}
                textAnchor="middle"
                fontSize={10}
                fill="white"
              >
                {formatDuration(duration)}
              </SvgText>
            </>
          );
        })}
      </Svg>
    </View>
  );
};

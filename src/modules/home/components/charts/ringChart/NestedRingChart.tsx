import { Colors } from '@constants/Colors';
import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

type NestedRingChartProps = {
  size: number; // Size of the SVG container
  strokeWidthOuter: number; // Thickness of the outer ring
  progressOuter: number; // Progress of the outer ring (0 to 1)
  colorOuter: string; // Color of the outer ring
  backgroundColorOuter?: string; // Background color of the outer ring (optional)
  strokeWidthInner?: number; // Thickness of the inner ring (optional)
  progressInner?: number; // Progress of the inner ring (0 to 1) (optional)
  colorInner?: string; // Color of the inner ring (optional)
  backgroundColorInner?: string; // Background color of the inner ring (optional)
};

const NestedRingChart: React.FC<NestedRingChartProps> = ({
  size,
  strokeWidthOuter,
  progressOuter,
  colorOuter,
  backgroundColorOuter = Colors.grey1,
  strokeWidthInner,
  progressInner,
  colorInner,
  backgroundColorInner = Colors.grey1,
}) => {
  const center = size / 2;
  const radiusOuter = (size - strokeWidthOuter) / 2;

  const circumferenceOuter = 2 * Math.PI * radiusOuter;
  const progressOuterStrokeDashoffset =
    circumferenceOuter * (1 - progressOuter);

  const hasInnerRing =
    strokeWidthInner && progressInner !== undefined && colorInner;

  const radiusInner = hasInnerRing
    ? radiusOuter - strokeWidthOuter - strokeWidthInner!
    : 0;
  const circumferenceInner = 2 * Math.PI * radiusInner;
  const progressInnerStrokeDashoffset = hasInnerRing
    ? circumferenceInner * (1 - progressInner!)
    : 0;

  return (
    <View>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          <Circle
            stroke={backgroundColorOuter}
            fill="none"
            cx={center}
            cy={center}
            r={radiusOuter}
            strokeWidth={strokeWidthOuter}
          />
          <Circle
            stroke={colorOuter}
            fill="none"
            cx={center}
            cy={center}
            r={radiusOuter}
            strokeWidth={strokeWidthOuter}
            strokeDasharray={circumferenceOuter}
            strokeDashoffset={progressOuterStrokeDashoffset}
            strokeLinecap="round"
          />
          {hasInnerRing && (
            <>
              <Circle
                stroke={backgroundColorInner}
                fill="none"
                cx={center}
                cy={center}
                r={radiusInner}
                strokeWidth={strokeWidthInner}
              />
              <Circle
                stroke={colorInner}
                fill="none"
                cx={center}
                cy={center}
                r={radiusInner}
                strokeWidth={strokeWidthInner}
                strokeDasharray={circumferenceInner}
                strokeDashoffset={progressInnerStrokeDashoffset}
                strokeLinecap="round"
              />
            </>
          )}
        </G>
      </Svg>
    </View>
  );
};

export default NestedRingChart;

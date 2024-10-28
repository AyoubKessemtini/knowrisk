// Arrow.tsx
import React from 'react';
import { Svg, Polyline, Line, G } from 'react-native-svg';
import { View } from 'react-native';

interface ArrowProps {
  size?: number;
}

export const Arrow: React.FC<ArrowProps> = ({ size = 30 }) => {
  return (
    <View style={{ position: 'absolute' }}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24.00 24.00"
        fill="#8756d2"
        stroke="#8756d2"
        transform="rotate(0)"
      >
        <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
        <G
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke="#be4b4b"
          stroke-width="0.288"
        ></G>
        <G id="SVGRepo_iconCarrier">
          <G id="Complete">
            <G id="arrow-up">
              <G>
                <Polyline
                  data-name="Right"
                  fill="none"
                  id="Right-2"
                  points="7 7.5 12 2.5 17 7.5"
                  stroke="#6f23e1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.696"
                ></Polyline>
                <Line
                  fill="none"
                  stroke="#6f23e1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.696"
                  x1="12"
                  x2="12"
                  y1="21.3"
                  y2="4.8"
                ></Line>
              </G>
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
};

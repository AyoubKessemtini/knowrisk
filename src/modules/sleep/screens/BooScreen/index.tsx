import { CImage } from '@components/CImage';
import { CText } from '@components/CText';
import { Screen } from '@components/Screen';
import React from 'react';

export const BooScreen = (): JSX.Element => {
  return (
    <Screen>
      <CText size="xl_bold" text="common.continue" />
      <CImage
        source={
          'https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg'
        }
        height={150}
      />
    </Screen>
  );
};

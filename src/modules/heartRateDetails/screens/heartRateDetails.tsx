import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { Header } from '@components/Headers/Header.tsx';
import { CText } from '@components/CText.tsx';
import { HeartRateAVGCard } from '@modules/heartRateDetails/components/heartRAteAVGCard.tsx';

export const HeartRateDetailsScreen: React.FC = () => {
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <Header
        hasBackButton
        useCustomBackButton
        text="common.heartRate"
        textColor="black"
      />
      <View style={styles.wrapper}>
        <CText size={'lg_light'}>Today</CText>
        <HeartRateAVGCard
          title={'Heart rate'}
          dateTime={'14:44'}
          value={'76'}
        />
        <CText size={'lg_light'}>Past 30 days</CText>
        <HeartRateAVGCard
          title={'Heart rate'}
          dateTime={'14:44'}
          value={'76'}
        />
        <HeartRateAVGCard
          title={'Heart rate'}
          dateTime={'14:44'}
          value={'76'}
        />
        <HeartRateAVGCard
          title={'Heart rate'}
          dateTime={'14:44'}
          value={'76'}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  wrapper: {
    justifyContent: 'center',
    width: '100%',
    gap: 30,
  },
});

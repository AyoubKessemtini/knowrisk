import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { Header } from '@components/Headers/Header.tsx';
import { CText } from '@components/CText.tsx';
import { HeartRateAVGCard } from '@modules/heartRateDetails/components/heartRAteAVGCard.tsx';

interface HeartRateDetails {
  date: string;
  hrAvg: number;
  hrvAvg: number;
}

export const HeartRateDetailsScreen: React.FC = () => {
  const heartRate: HeartRateDetails[] = [
    {
      date: '2024-10-28',
      hrAvg: 91,
      hrvAvg: 44,
    },
    {
      date: '2024-10-27',
      hrAvg: 99,
      hrvAvg: 40,
    },
    {
      date: '2024-10-26',
      hrAvg: 88,
      hrvAvg: 41,
    },
    {
      date: '2024-10-25',
      hrAvg: 77,
      hrvAvg: 42,
    },
    {
      date: '2024-10-24',
      hrAvg: 66,
      hrvAvg: 43,
    },
    {
      date: '2024-10-23',
      hrAvg: 77,
      hrvAvg: 44,
    },
    {
      date: '2024-10-22',
      hrAvg: 88,
      hrvAvg: 45,
    },
  ];
  const today: string = new Date().toISOString().split('T')[0];
  const todayData = heartRate.filter((data) => data.date === today)[0];
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
          title={'Realtime Heart rate'}
          dateTime={'Now'}
          value={'76'}
        />
        <HeartRateAVGCard
          title={'Heart rate average'}
          dateTime={'Today'}
          value={String(todayData.hrAvg)}
        />
        <HeartRateAVGCard
          title={'Heart rate variability average'}
          dateTime={'Today'}
          value={String(todayData.hrvAvg)}
        />
        <CText size={'lg_light'}>Past 7 days</CText>
        {heartRate
          .filter((data) => data.date !== today)
          .map((data) => (
            <View>
              <HeartRateAVGCard
                key={data.date}
                title={'Heart rate average'}
                dateTime={data.date}
                value={String(data.hrAvg)}
              />
              <HeartRateAVGCard
                key={data.date}
                title={'Heart rate variability average'}
                dateTime={data.date}
                value={String(data.hrvAvg)}
              />
            </View>
          ))}
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
    gap: 20,
  },
});

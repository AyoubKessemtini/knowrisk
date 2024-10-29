import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { Header } from '@components/Headers/Header.tsx';
import { CText } from '@components/CText.tsx';
import { HeartRateAVGCard } from '@modules/heartRateDetails/components/heartRAteAVGCard.tsx';
import { core } from "@config/Configuration.ts";

interface HeartRateDetails {
  date: string;
  heartRate: number;
  heartRateVariability: number;
  day: string;
}

export const HeartRateDetailsScreen: React.FC = () => {
  const [heartRate, setHeartRate] = useState<HeartRateDetails[]>([]);
  const [todayData, setTodayData] = useState<HeartRateDetails | null>(null);
  const today: string = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchHeartRateData = async () => {
      try {
        const res = await core.getHeartRateWeeklyData.execute();
        console.log('res', res);
        const heartRateData: HeartRateDetails[] = res['value'];

        // Find today's data
        const todayData = heartRateData.find((data) => data.date === today) || null;

        setHeartRate(heartRateData);
        setTodayData(todayData);
      } catch (error) {
        console.error("Error fetching heart rate data:", error);
      }
    };

    fetchHeartRateData(); // Call the function
  }, [today]);

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
          {todayData && (
              <>
                <HeartRateAVGCard
                    title={'Heart rate average'}
                    dateTime={'Today'}
                    value={String(todayData.heartRate)}
                />
                <HeartRateAVGCard
                    title={'Heart rate variability average'}
                    dateTime={'Today'}
                    value={String(todayData.heartRateVariability)}
                />
              </>
          )}
          <CText size={'lg_light'}>Past 7 days</CText>
          {heartRate
              .filter((data) => data.date !== today)
              .map((data) => (
                  <View key={data.date}>
                    <HeartRateAVGCard
                        title={'Heart rate average'}
                        dateTime={`${data.day} ${data.date}`}
                        value={String(data.heartRate)}
                    />
                    <HeartRateAVGCard
                        title={'Heart rate variability average'}
                        dateTime={`${data.day} ${data.date}`}
                        value={String(data.heartRateVariability)}
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

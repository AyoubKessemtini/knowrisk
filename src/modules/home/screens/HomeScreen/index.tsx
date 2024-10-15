import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@components/Screen';
import { MainHeader } from '@components/Headers/MainHeader';
import { PatientInfoCard } from '@components/Cards/GeneralPatientInformationsCard';
import { ReportSeizureCard } from '@components/Cards/ReportSeizureCard';
import { CText } from '@components/CText';
import { SleepCard } from '@components/Cards/SleepCard';
import { StressLevelCard } from '@components/Cards/StressLevelIndicator';
import { RecoveryComponent } from '@components/Cards/RecoveryCard';
import { Colors } from '@constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackRoutes } from '../../../../navigators/routes';
import { useFetchHealthData } from '@modules/home/viewModel/FetchHealthData';
import { DateSelector } from '@components/DatePicker/DatePicker';
import { formatTime } from '@hooks/useDateFormatter';
import { useAppSelector } from '@store/index.ts';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  // Fetch health data for the selected date
  const { healthData } = useFetchHealthData(selectedDate);

  // Fetch weather data

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  /*
  const heartRateData = {
    data: healthData?.heartRate?.[0]?.value || '73',
    lastUpdated: formatTime(
      healthData?.heartRate?.[0]?.endDate || new Date().toISOString(),
    ),
  };
  const restingHeartRateData = {
    data: healthData?.restingHeartRate?.[0]?.value || '64',
    lastUpdated: formatTime(
      healthData?.restingHeartRate?.[0]?.endDate || new Date().toISOString(),
    ),
  };
   */

  const respiratoryRateData = healthData?.respiratoryRate?.[0] || {
    value: 17,
    endDate: new Date().toISOString(),
  };

  const { isDeviceConnectedBLE, hr, steps, temperature } = useAppSelector(
    (state) => state.bleData,
  );

  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <MainHeader firstName="Firas" lastName="R" />
      <View style={styles.wrapper}>
        <PatientInfoCard
          name="Firas Rhaeim"
          id="ID5434A533"
          lastSeizure="Sun, Apr 07, 22:54"
          seizureFrequency="Weekly"
          seizureRisk="Moderate"
          isDevicePaired={isDeviceConnectedBLE}
          mood="happy"
          temp={temperature}
        />
        <ReportSeizureCard
          onPress={() => {
            navigation.navigate(RootStackRoutes.REPORT_SEIZURE_INTRO_SCREEN);
          }}
        />
        <DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <View style={styles.row}>
          <SleepCard
            lastUpdated={isDeviceConnectedBLE ? 'Now' : '--'}
            sleepData={hr as string}
            title="common.heartRate"
            unit="bpm"
          />
          <SleepCard
            lastUpdated={isDeviceConnectedBLE ? 'Now' : '  --'}
            sleepData={steps as string}
            title="common.steps"
            unit="step"
          />
        </View>
        <View style={styles.row}>
          <RecoveryComponent
            title="Respiratory rate"
            value={respiratoryRateData.value}
            maxValue={30}
            unit="RPM"
            onPress={() => {}}
            activeStrokeColor={Colors.yellow2}
            inActiveStrokeColor={Colors.lightPurple}
            description={
              respiratoryRateData.endDate
                ? formatTime(respiratoryRateData.endDate)
                : formatTime(new Date().toISOString())
            }
          />
        </View>
        <View style={styles.row}>
          <StressLevelCard
            date={formatTime(new Date().toISOString())}
            stressLevels={{ low: '10h', good: '7h', high: '5h' }}
            progress={{ low: 42, good: 33, high: 25 }}
            comparison={{ low: 30, good: 40, high: 30 }}
          />
        </View>
        <CText size="lg_semiBold" color="black">
          Last Sleep Statistic
        </CText>
        <View style={styles.row}>
          <SleepCard
            lastUpdated={formatTime(new Date().toISOString())}
            sleepData={'67'}
            title="common.quality"
            unit="%"
          />
          <SleepCard
            lastUpdated={formatTime(new Date().toISOString())}
            sleepData={'7h 30m'}
            title="common.average"
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  wrapper: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Home;

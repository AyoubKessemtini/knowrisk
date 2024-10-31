import React, { useEffect, useState } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { Screen } from '@components/Screen';
import { MainHeader } from '@components/Headers/MainHeader';
import { PatientInfoCard } from '@components/Cards/GeneralPatientInformationsCard';
import { ReportSeizureCard } from '@components/Cards/ReportSeizureCard';
import { SleepCard } from '@components/Cards/SleepCard';
import { StressLevelCard } from '@components/Cards/StressLevelIndicator';
import { useNavigation } from '@react-navigation/native';
import { RootStackRoutes } from '../../../../navigators/routes';
import { DateSelector } from '@components/DatePicker/DatePicker';
import { formatTime } from '@hooks/useDateFormatter';
import { RootState, useAppSelector } from '@store/index.ts';
import { MedicationsList } from '@components/Medication/MedicationsList.tsx';
import { WeeklyHeartInfosCard } from '@components/Cards/WeeklyHeartInfosCard.tsx';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { AuthActions } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Journal } from '@components/Cards/JournalCard.tsx';
import { TriggersCard } from '@modules/home/components/triggersCard.tsx';

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  // Fetch health data for the selected date
  //const { healthData } = useFetchHealthData(selectedDate);

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

    const respiratoryRateData = healthData?.respiratoryRate?.[0] || {
    value: 17,
    endDate: new Date().toISOString(),
  };
   */

  const { isDeviceConnectedBLE, hr, steps, temperature } = useAppSelector(
    (state: RootState) => state.bleData,
  );
  const dispatch = useDispatch();

  // User's name

  // const backgroundColor = getBackgroundColor(firstName + lastName);
  const user = useSelector((state: RootState) => state.auth.user);
  const getFirstNameAndLastName = (
    username: string | null,
  ): { firstName: string; lastName: string } => {
    if (!username) {
      return { firstName: 'Unknown', lastName: 'User' }; // Default values
    }
    const [firstName, lastName] = username.split('.');
    return {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
    };
  };
  // Fallback values if user data is not available
  const { firstName, lastName } = getFirstNameAndLastName(
    user?.username || null,
  );

  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);

      if (userData) {
        // Parse the user data and dispatch to Redux
        const user = JSON.parse(userData);
        dispatch(AuthActions.setUser(user)); // Store user data in Redux
      }

      console.log('USER_DATA root ', userData);
    };

    checkLoginStatus();
  }, [dispatch]);
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <MainHeader firstName={firstName} lastName={lastName} />
      <View style={styles.wrapper}>
        <PatientInfoCard
          name={`${firstName} ${lastName}`}
          id={`ID: ${user?.id.split('-')[0]}`}
          lastSeizure="Sun, Apr 07, 22:54"
          seizureFrequency="Weekly"
          seizureRisk="Moderate"
          isDevicePaired={isDeviceConnectedBLE}
          mood="happy"
          temp={
            temperature === '--'
              ? '--'
              : parseInt(temperature, 10) > 30 && parseInt(temperature, 10) < 41
                ? temperature
                : '36.4'
          }
        />
        <ReportSeizureCard
          onPress={() => {
            navigation.navigate(RootStackRoutes.REPORT_SEIZURE_INTRO_SCREEN);
          }}
        />
        <TriggersCard
            data={[
              {
                name: 'Fatigue',
                color: '#E95050',
                value: 27,
              },
              {
                name: 'Sleep',
                color: '#FFA224',
                value: 33,
              },
              {
                name: 'Stess',
                color: '#2AC686',
                value: 40,
              },
            ]}
        />
        <DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <View style={styles.row}>
          <SleepCard
            lastUpdated={isDeviceConnectedBLE ? 'Now' : '--'}
            sleepData={
              temperature === '--'
                ? '--'
                : parseInt(temperature, 10) > 30 &&
                    parseInt(temperature, 10) < 41
                  ? temperature
                  : '36.4'
            }
            title="common.temperature"
            unit="C°"
          />
          <SleepCard
            lastUpdated={isDeviceConnectedBLE ? 'Now' : '  --'}
            sleepData={steps as string}
            title="common.steps"
            unit="step"
          />
        </View>
        <View style={styles.row}>
          <WeeklyHeartInfosCard
            lastUpdated={isDeviceConnectedBLE ? 'Now' : '--'}
            heartRateData={hr as string}
          />
          <Journal />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate(RootStackRoutes.STRESS_SCREEN)}>
          <View style={styles.row}>
            <StressLevelCard
                date={formatTime(new Date().toISOString())}
                stressLevels={{ low: '10h', good: '7h', high: '5h' }}
                progress={{ low: 42, good: 33, high: 25 }}
                comparison={{ low: 30, good: 40, high: 30 }}
            />
          </View>
        </TouchableOpacity>
        <MedicationsList />
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
    paddingBottom: 120,
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

/*
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
 */

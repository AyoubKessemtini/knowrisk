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
//import { DateSelector } from '@components/DatePicker/DatePicker';
import {formatStringDate} from '@hooks/useDateFormatter';
import { RootState, useAppSelector } from '@store/index.ts';
//import { MedicationsList } from '@components/Medication/MedicationsList.tsx';
import { WeeklyHeartInfosCard } from '@components/Cards/WeeklyHeartInfosCard.tsx';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { AuthActions } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Journal } from '@components/Cards/JournalCard.tsx';
import { TriggersCard } from '@modules/home/components/triggersCard.tsx';
import {CText} from "@components/CText.tsx";
import {CircularQualityCard} from "@modules/sleep/screens/components/circularQualityCard.tsx";
import {Colors} from "@constants/Colors.ts";
import {core} from "@config/Configuration.ts";
import {StressDeviceData, stressRateData} from "@core/entities/deviceDataApisEntity/StressDeviceData.ts";

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();
  const [stressData, setStressData] = useState<StressDeviceData>(null);
  const [spo2Data, setSpo2Data] = useState<Spo2Data>(null);
  const [lowStressData, setLowStressData] = useState<stressRateData>(null);
  const [mediumStressData, setMediumStressData] = useState<stressRateData>(null);
  const [highStressData, setHighStressData] = useState<stressRateData>(null);


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

      //get daily stress
      const fetchStressDailyData = async () => {
        try {
          const fetchedData = await core.getStressDailyData.execute(formatStringDate(selectedDate));
          setStressData(fetchedData);
          if(fetchedData !=null){
            setHighStressData(
              fetchedData.data.find((s) => s.stressLevel === 'High'),
            );
            setMediumStressData(fetchedData.data.find(s => s.stressLevel === "Medium"));
            setLowStressData(fetchedData.data.find(s => s.stressLevel === "Low"));
          }
        } catch (error) {
          console.error('Failed to fetch stress data:', error);
        }
      };
      fetchStressDailyData();

      //get daily spo2
      const fetchSpo2DailyData = async () => {
        try {
          const fetchedData = await core.getSpo2DailyData.execute(formatStringDate(selectedDate));
          setSpo2Data(fetchedData);
          console.log('fetchedData');
          console.log(fetchedData);
        } catch (error) {
          console.error('Failed to fetch stress data:', error);
        }
      };
      fetchSpo2DailyData();
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
        {/*<DateSelector
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        />*/}
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
          <SleepCard
              lastUpdated={isDeviceConnectedBLE ? 'Now' : '  --'}
              sleepData={hr as string}
              title="common.heartRate"
              unit="BPM"
              onPress={()=>navigation.navigate(RootStackRoutes.HEART_RATE_DETAILS)}
          />
          <Journal />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate(RootStackRoutes.STRESS_SCREEN)}>
          <View style={styles.row}>
            <StressLevelCard
                date={
                  stressData
                      ? formatStringDate(selectedDate)
                      : `${formatStringDate(selectedDate)} (Calculating)`
                }
                stressLevels={{
                  low: stressData ? lowStressData.time : 'Calculating',
                  good: stressData ? mediumStressData.time : 'Calculating',
                  high: stressData ? highStressData.time : 'Calculating',
                }}
                progress={{
                  low: stressData ? Number(lowStressData.percentage) : 0,
                  good: stressData ? Number(mediumStressData.percentage) : 10,
                  high: stressData ? Number(highStressData.percentage) : 0,
                }}
                comparison={{ low: 30, good: 40, high: 30 }}
            />
          </View>
        </TouchableOpacity>
        {/*<MedicationsList />*/}
        <View style={styles.qualityCardRatesContainer}>
          {/* <CText mb={15} size="md_medium" color="black">
            Sleep quality
          </CText>*/}
          <View style={styles.row}>
            <CircularQualityCard
                value={spo2Data ? spo2Data.averageOxygenSaturation*100 : 0}
                title={'Blood oxygen'}
                date={spo2Data ?formatStringDate(selectedDate) : `${formatStringDate(selectedDate)} \n\t(Calculating)`}
            />
            <CircularQualityCard
                value={0}
                title={'Respiratory rate'}
                date={`${formatStringDate(selectedDate)} \n\t(Calculating)`}
            />
          </View>
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
    paddingBottom: 50,
  },
  wrapper: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  qualityCardRatesContainer: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
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

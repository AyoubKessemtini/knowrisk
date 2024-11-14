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
import {formatStringDate, formatTime} from '@hooks/useDateFormatter';
import { RootState, useAppSelector } from '@store/index.ts';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { AuthActions } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Journal } from '@components/Cards/JournalCard.tsx';
import { TriggersCard } from '@modules/home/components/triggersCard.tsx';
import {Colors} from "@constants/Colors.ts";
import {core} from "@config/Configuration.ts";
import {StressDeviceData, stressRateData} from "@core/entities/deviceDataApisEntity/StressDeviceData.ts";
import {PatientData} from "@core/entities/deviceDataApisEntity/PatientData.ts";
import {MedicationsList} from "@components/Medication/MedicationsList.tsx";

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();
  const [stressData, setStressData] = useState<StressDeviceData>(null);
  const [spo2Data, setSpo2Data] = useState<Spo2Data>(null);
  const [patientData, setPatientData] = useState<PatientData>(null);
  const [lowStressData, setLowStressData] = useState<stressRateData>(null);
  const [mediumStressData, setMediumStressData] = useState<stressRateData>(null);
  const [highStressData, setHighStressData] = useState<stressRateData>(null);
  const colors: string[] = [
    '#FFA224',
    '#9a76e0',
    '#eea8b5',
    '#2AC686',
    '#E95050',
    '#a4a4d3',
    '#3d5434',
  ];
  const [medications, setMedications] = useState<Medication[]>(null);

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
      await fetchStressDailyData();
      await fetchSpo2DailyData();
      await fetchMedications();
      await fetchPatientData();
      console.log('USER_DATA root ', userData);
    };
    checkLoginStatus();
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
    const fetchSpo2DailyData = async () => {
      try {
        const fetchedData = await core.getSpo2DailyData.execute(formatStringDate(selectedDate));
        setSpo2Data(fetchedData);
      } catch (error) {
        console.error('Failed to fetch stress data:', error);
      }
    };
    const fetchMedications = async () => {
      try {
        const fetchedData = await core.getMedications.execute();
        console.log('medications')
        console.log(fetchedData)
        setMedications(fetchedData);
      } catch (error) {
        console.error('Failed to fetch medications:', error);
      }
    };
    const fetchPatientData = async () => {
      try {
        const fetchedData = await core.getPatientData.execute();
        setPatientData(fetchedData);
      } catch (error) {
        console.error('Failed to fetch patient data:', error);
      }
    };
  }, []);
  return (
    <Screen
      fullscreen
      withoutTopEdge
      noHorizontalPadding
      containerStyles={styles.container}
    >
      <MainHeader firstName={firstName} lastName={lastName}  />
      <View style={styles.wrapper}>
        <PatientInfoCard
          name={`${firstName} ${lastName}`}
          id={`ID: ${user?.id.split('-')[0]}`}
          lastSeizure={patientData && patientData.seizures ? `${patientData.seizures.date}, ${patientData.seizures.time_from}` : 'No seizures detected'}
          seizureFrequency={patientData && patientData.seizures_per_day ? patientData.seizures_per_day : 'N/A'}
          seizureRisk={patientData && patientData.stress ? patientData.stress.stress_level : 'N/A'} //"Moderate"
          isDevicePaired={isDeviceConnectedBLE}
          mood={patientData && patientData.stress ? patientData.stress.mood : 'N/A'} //"happy"
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
            data={ patientData ? patientData.triggers.map((t,index)=>{
              return {
                    name: t.trigger,
                    color: colors[index],
                    value: t.percentage * 100,
                  };
                })
              : [
                  {
                    name: 'Calculating',
                    color: colors[0],
                    value: 100,
                  },
                ]
          }
        />
        {/*
        [
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
            ]
        <DateSelector
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
                  low: lowStressData ? lowStressData.time : 'Calculating',
                  good: mediumStressData ? mediumStressData.time : 'Calculating',
                  high: highStressData ? highStressData.time : 'Calculating',
                }}
                progress={{
                  low: lowStressData ? Number(lowStressData.percentage) : 0,
                  good: mediumStressData ? Number(mediumStressData.percentage) : 10,
                  high: highStressData ? Number(highStressData.percentage) : 0,
                }}
                comparison={{ low: 30, good: 40, high: 30 }}
            />
          </View>
        </TouchableOpacity>
        {/*<MedicationsList />*/}
        <View style={styles.row}>
          <SleepCard
              lastUpdated={patientData && patientData.oxygen_saturations ? formatTime(patientData.oxygen_saturations.date) : '  --'}
              sleepData={patientData && patientData.oxygen_saturations ? patientData.oxygen_saturations.oxygen_saturation.toString() : '--'}
              title="common.bloodOxygen"
              unit="%"
              //onPress={()=>navigation.navigate(RootStackRoutes.HEART_RATE_DETAILS)}
          />
          <SleepCard
              lastUpdated={patientData && patientData.respiratory_rates ? formatTime(patientData.respiratory_rates.date) : '  --'}
              sleepData={patientData && patientData.respiratory_rates ? patientData.respiratory_rates.respiratory_rate.toString() : '--'}
              title="common.respiratoryRates"
              unit="RPM"
              //onPress={()=>navigation.navigate(RootStackRoutes.HEART_RATE_DETAILS)}
          />
        </View>
        {medications !== null && (
          <MedicationsList medicationsData={medications} />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //gap: 12,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 160,
  },
  wrapper: {
    gap: 20
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

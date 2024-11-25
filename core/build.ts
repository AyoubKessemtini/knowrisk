import { AxiosInstance } from 'axios';
import { RDConversationsRepo } from './adapters/real/repositories/RDConversationsRepo';
import { GetConversationsMapper } from './adapters/real/mappers/conversationRepository/GetConversationsMapper';
import { GetConversations } from './usecases/conversationsRepository/getConversations/GetConversations';
import { SendIOSHealthData } from './usecases/iosHealthData/sendIOSHealthData/SendIOSData';
import { RDIOSHealthDataRepo } from './adapters/real/repositories/RDIOSHealthDataRepo';
import { RDAuthRepo } from './adapters/real/repositories/RDAuthRepo';
import { LoginWithEmail } from './usecases/authRepository/Login_With_Email';
import { RDFitBit } from './adapters/real/repositories/RDFitBitRepo';
import { GetHrvByDate } from './usecases/fitBitRepository/GetHrvByDate';
import { GetSleepByDate } from '@core/usecases/fitBitRepository/GetSleepByDate.ts';
import { GetStressByDate } from '@core/usecases/fitBitRepository/GetStressByDate.ts';
import { GetSpo2ByDate } from '@core/usecases/fitBitRepository/GetSpo2DataByDate.ts';
import { GetActivitiesByDate } from '@core/usecases/fitBitRepository/GetActivitiesByDate.ts';
import { StoreDeviceHealthData } from '@core/usecases/deviceRepository/StoreDeviceHealthData.ts';
import { RDDeviceHealthDataRepo } from './adapters/real/repositories/RDDeviceHealthDataRepo.ts';
import { GetHeartRateWeeklyData } from '@core/usecases/deviceFetchDataApisRepository/GetHeartRateWeeklyData.ts';
import { RDDeviceDataApisRepo } from './adapters/real/repositories/deviceDataApis/RDDeviceDataApisRepo.ts';
import { GetStressDailyData } from '@core/usecases/deviceFetchDataApisRepository/GetStressDailyData.ts';
import { GetSleepDailyData } from '@core/usecases/deviceFetchDataApisRepository/GetSleepDailyData.ts';
import { GetSpo2DailyData } from '@core/usecases/deviceFetchDataApisRepository/GetSpo2DailyData.ts';
import { RDChatRepo } from './adapters/real/repositories/RDChatRepo.ts';
import { SendMessage } from '@core/usecases/chatBot/SendMessage.ts';
import { GetPatientData } from '@core/usecases/deviceFetchDataApisRepository/GetPatientData.ts';
import { InviteDoctor } from '@core/usecases/invitations/InviteDoctor.ts';
import { RDInvitationRepo } from './adapters/real/repositories/RDInvitationRepo.ts';
import { RDMedicationRepo } from './adapters/real/repositories/RDMedicationRepo.ts';
import { AddMedication } from '@core/usecases/medications/AddMedications.ts';
import { GetMedications } from '@core/usecases/medications/GetMedications.ts';
import { DeleteMedication } from '@core/usecases/medications/DeleteMedication.ts';
import { RDJournalRepo } from './adapters/real/repositories/RDJournalRepo.ts';
import { GetDailyJournal } from '@core/usecases/journal/GetDailyJournal.ts';
import { UpdateDailyJournal } from '@core/usecases/journal/UpdateDailyJournal.ts';

export enum PersistNavigationEnum {
  DEV = 'dev',
  PROD = 'prod',
}

export interface BaseConfigurationProps {
  persistNav: PersistNavigationEnum;
  realDependencies: boolean;
}

export interface ConfigurationProps {
  httpClient: AxiosInstance;
}

export type CoreConfiguration = BaseConfigurationProps & ConfigurationProps;

export const Core = (configuration: CoreConfiguration) => {
  const realDependencies = configuration.realDependencies;
  const httpClient = configuration.httpClient;

  //REPOSITORIES
  const iosHealthDataRepo = new RDIOSHealthDataRepo(httpClient);
  const deviceHealthDataRepo = new RDDeviceHealthDataRepo(httpClient);
  const deviceDataApisRepo = new RDDeviceDataApisRepo(httpClient);
  const authRepo = new RDAuthRepo(httpClient);
  //fitbit
  const fitBitRepo = new RDFitBit(httpClient);
  //chatbot
  const chatRepo = new RDChatRepo(httpClient);
  //invitations
  const invitationsRepo = new RDInvitationRepo(httpClient);
  //medication
  const medicationRepo = new RDMedicationRepo(httpClient);
  //journal
  const journalRepo = new RDJournalRepo(httpClient);

  const conversationsRepository = realDependencies
    ? new RDConversationsRepo(httpClient, new GetConversationsMapper())
    : new RDConversationsRepo(httpClient, new GetConversationsMapper());

  //USECASES
  const loginWithEmail = new LoginWithEmail(authRepo);
  const getConversations = new GetConversations(conversationsRepository);
  const sendIOSHealthData = new SendIOSHealthData(iosHealthDataRepo);
  const getHrvByDate = new GetHrvByDate(fitBitRepo);
  const getSleepByDate = new GetSleepByDate(fitBitRepo);
  const getStressByDate = new GetStressByDate(fitBitRepo);
  const getSpo2ByDate = new GetSpo2ByDate(fitBitRepo);
  const getActivities2ByDate = new GetActivitiesByDate(fitBitRepo);
  const storeDeviceHealthData = new StoreDeviceHealthData(deviceHealthDataRepo);
  const sendMessage = new SendMessage(chatRepo);
  //device
  const getHeartRateWeeklyData = new GetHeartRateWeeklyData(deviceDataApisRepo);
  const getStressDailyData = new GetStressDailyData(deviceDataApisRepo);
  const getSleepDailyData = new GetSleepDailyData(deviceDataApisRepo);
  const getSpo2DailyData = new GetSpo2DailyData(deviceDataApisRepo);
  const getPatientData = new GetPatientData(deviceDataApisRepo);
  //invitation
  const inviteDoctor = new InviteDoctor(invitationsRepo);
  //medication
  const addMedication = new AddMedication(medicationRepo);
  const getMedications = new GetMedications(medicationRepo);
  const deleteMedication = new DeleteMedication(medicationRepo);
  //journal
  const getDailyJournal = new GetDailyJournal(journalRepo);
  const updateDailyJournal = new UpdateDailyJournal(journalRepo);
  return {
    getConversations,
    sendIOSHealthData,
    loginWithEmail,
    getHrvByDate,
    getSleepByDate,
    getStressByDate,
    getSpo2ByDate,
    getActivities2ByDate,
    storeDeviceHealthData,
    getHeartRateWeeklyData,
    getStressDailyData,
    getSleepDailyData,
    getSpo2DailyData,
    sendMessage,
    getPatientData,
    inviteDoctor,
    addMedication,
    getMedications,
    deleteMedication,
    getDailyJournal,
    updateDailyJournal,
  };
};

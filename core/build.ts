import { AxiosInstance } from 'axios';
import { RDConversationsRepo } from './adapters/real/repositories/RDConversationsRepo';
import { GetConversationsMapper } from './adapters/real/mappers/conversationRepository/GetConversationsMapper';
import { GetConversations } from './usecases/conversationsRepository/getConversations/GetConversations';
import { SendIOSHealthData } from './usecases/iosHealthData/sendIOSHealthData/SendIOSData';
import { RDIOSHealthDataRepo } from './adapters/real/repositories/RDIOSHealthDataRepo';
import { RDAuthRepo } from './adapters/real/repositories/RDAuthRepo';
import { LoginWithEmail } from './usecases/authRepository/Login_With_Email';

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
  const authRepo = new RDAuthRepo(httpClient);

  const conversationsRepository = realDependencies
    ? new RDConversationsRepo(httpClient, new GetConversationsMapper())
    : new RDConversationsRepo(httpClient, new GetConversationsMapper());

  //USECASES
  const loginWithEmail = new LoginWithEmail(authRepo);
  const getConversations = new GetConversations(conversationsRepository);
  const sendIOSHealthData = new SendIOSHealthData(iosHealthDataRepo);
  return { getConversations, sendIOSHealthData, loginWithEmail };
};

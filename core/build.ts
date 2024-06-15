import { AxiosInstance } from 'axios';
import { RDConversationsRepo } from './adapters/real/repositories/RDConversationsRepo';
import { GetConversationsMapper } from './adapters/real/mappers/conversationRepository/GetConversationsMapper';
import { GetConversations } from './usecases/conversationsRepository/getConversations/GetConversations';

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
  const conversationsRepository = realDependencies
    ? new RDConversationsRepo(httpClient, new GetConversationsMapper())
    : new RDConversationsRepo(httpClient, new GetConversationsMapper());

  //USECASES
  const getConversations = new GetConversations(conversationsRepository);

  return { getConversations };
};

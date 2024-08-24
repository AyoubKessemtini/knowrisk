import {
  BaseConfigurationProps,
  ConfigurationProps,
  Core,
  CoreConfiguration,
  PersistNavigationEnum,
} from '@core/build';
import { IS_DEV } from '@utils/platform';
import { devConfig } from './config.dev';
import { prodConfig } from './config.prod';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';

export enum CONSTANTS {
  WEATHER_api = `https://api.openweathermap.org/data/2.5/weather?`,
}
const baseConfiguration: BaseConfigurationProps = {
  persistNav: PersistNavigationEnum.DEV,
  realDependencies: true,
};

const configuration: ConfigurationProps = IS_DEV ? devConfig : prodConfig;

export const Configuration: CoreConfiguration = {
  ...baseConfiguration,
  ...configuration,
};

Configuration.httpClient.interceptors.request.use((config) => {
  const token = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['Ocp-Apim-Subscription-Key'] =
    '9224774ccb564ecaa7be82cde6eec753';

  return config;
});
Configuration.httpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //const message = error.response?.data?.message || error.message;
    //DO SOMETHING

    return Promise.reject(error);
  },
);

export const core = Core(Configuration);

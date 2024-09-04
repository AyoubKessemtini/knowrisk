import { ConfigurationProps } from '@core/build';
import axios from 'axios';

const DEV_URL = 'https://service.knowlepsy.io/knowlepsy';

export const devConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: DEV_URL }),
};

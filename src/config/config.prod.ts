import { ConfigurationProps } from '@core/build';
import axios from 'axios';

const PROD_URL = 'https://service.knowlepsy.io/knowlepsy';

export const prodConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: PROD_URL }),
};

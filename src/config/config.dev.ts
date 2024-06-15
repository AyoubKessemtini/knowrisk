import { ConfigurationProps } from '@core/build';
import axios from 'axios';

const DEV_URL = 'https://jsonplaceholder.typicode.com/';

export const devConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: DEV_URL }),
};

import { ConfigurationProps } from '@core/build';
import axios from 'axios';

const PROD_URL = 'https://jsonplaceholder.typicode.com/';

export const prodConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: PROD_URL }),
};

import { ConfigurationProps } from '@core/build';
import axios from 'axios';

const DEV_URL = 'https://apim-dataworkflow-dev-us.azure-api.net';

export const devConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: DEV_URL }),
};

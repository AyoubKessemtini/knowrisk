import { ConfigurationProps } from '@core/build';
import axios from 'axios';

const PROD_URL = 'https://apim-dataworkflow-dev-us.azure-api.net';

export const prodConfig: ConfigurationProps = {
  httpClient: axios.create({ baseURL: PROD_URL }),
};

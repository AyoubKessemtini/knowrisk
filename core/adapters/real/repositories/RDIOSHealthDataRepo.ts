import { AxiosInstance } from 'axios';
import { IOSHealthDataRepo } from '@core/domain/repositories/IOSHealthDataRepo';

export class RDIOSHealthDataRepo implements IOSHealthDataRepo {
  constructor(private httpClient: AxiosInstance) {}

  async SendIOSHealthData(req: any): Promise<void> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        'Ocp-Apim-Subscription-Key': '9224774ccb564ecaa7be82cde6eec753',
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: any = await this.httpClient.post(
      'https://apim-dataworkflow-dev-us.azure-api.net/ReceiveData',
      req,
      config,
    );
    return result;
  }
}

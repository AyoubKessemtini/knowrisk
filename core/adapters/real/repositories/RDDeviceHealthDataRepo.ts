import { AxiosInstance } from 'axios';
import { DeviceHealthDataRepo } from '@core/domain/repositories/DeviceHealthDataRepo.ts';

export class RDDeviceHealthDataRepo implements DeviceHealthDataRepo {
  constructor(private httpClient: AxiosInstance) {}

  async SendDeviceHealthData(req: any): Promise<void> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        'Ocp-Apim-Subscription-Key': '9224774ccb564ecaa7be82cde6eec753',
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: any = await this.httpClient.post(
      'https://apim-dataworkflow-dev-us.azure-api.net/ReceiveData',
      {
        type: 'device',
        userId: '9960bbca-ed0b-4cf9-9e74-a71dc7847333',
        data: req,
      },
      config,
    );
    return result;
  }
}

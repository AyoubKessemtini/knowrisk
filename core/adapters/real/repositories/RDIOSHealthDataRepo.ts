import { AxiosInstance } from 'axios';
import { IOSHealthDataRepo } from '@core/domain/repositories/IOSHealthDataRepo';

export class RDIOSHealthDataRepo implements IOSHealthDataRepo {
  constructor(private httpClient: AxiosInstance) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async SendIOSHealthData(req: any): Promise<void> {
    const result: any = await this.httpClient.post('/ReceiveData', req);
    return result;
  }
}

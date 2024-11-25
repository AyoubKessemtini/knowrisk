import { AxiosInstance } from 'axios';
import { JournalRepo } from '@core/domain/repositories/JournalRepo.ts';
import { Journal } from '@core/entities/deviceDataApisEntity/Journal.ts';
import { PersistenceStorage } from '@storage/index.ts';
import { KEYS } from '@storage/Keys.ts';
import { UpdateDailyJournalCommand } from '@core/usecases/journal/UpdateDailyJournal.ts';

export class RDJournalRepo implements JournalRepo {
  constructor(private httpClient: AxiosInstance) {}

  //baseUrl: string = 'https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net';

  baseUrl: string = 'http://172.214.33.253:3001';

  async getDailyJournal(date: string): Promise<Journal[]> {
    const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const result = await this.httpClient.get(
      `${this.baseUrl}/api/journal?date=${date}`,
      config,
    );
    //@ts-ignore
    return result.questions;
  }

  async updateDailyJournal(req: UpdateDailyJournalCommand): Promise<any> {
    const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const result = await this.httpClient.post(
      `${this.baseUrl}/api/journal/update-answers`,
      req,
      config,
    );
    return result;
  }
}

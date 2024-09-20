import { AxiosInstance } from 'axios';
import { FitBitRepo } from '@core/domain/repositories/FitBitRepo';
import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { HRVData } from '@core/domain/entities/fitBitEntities/HrvByDate';
import { GetSleepByDateCommand } from '@core/usecases/fitBitRepository/GetSleepByDate.ts';
import { GetSpo2ByDateCommand } from '@core/usecases/fitBitRepository/GetSpo2DataByDate.ts';
import { GetActivitiesByDateCommand } from '@core/usecases/fitBitRepository/GetActivitiesByDate.ts';
import { SleepData } from '@core/entities/fitBitEntities/SleepByDate.ts';
import { StressData } from '@core/entities/fitBitEntities/StressData.ts';
import { SpO2Data } from '@core/entities/fitBitEntities/Spo2Data.ts';
import { ActivitiesData } from '@core/entities/fitBitEntities/ActivitiesData.ts';

export class RDFitBit implements FitBitRepo {
  constructor(private httpClient: AxiosInstance) {}

  accessToken: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1BRQ1EiLCJzdWIiOiJDN1o2VE4iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJudXQgcnBybyByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByaHIgcnRlbSIsImV4cCI6MTcyNjg2NzQxNywiaWF0IjoxNzI2ODM4NjE3fQ.h6bgoCOkCfZcooLUUtcWqfQ6Usp6xEwHQptJfV9nmTc';
  async getHrvbyDate(req: GetHrvByDateCommand): Promise<HRVData> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
    const { date } = req;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: HRVData = await this.httpClient.get(
      `https://api.fitbit.com/1/user/-/hrv/date/${date}.json`,
      config,
    );
    return result;
  }

  async getSleepByDate(req: GetSleepByDateCommand): Promise<SleepData> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
    const { date } = req;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: SleepData = await this.httpClient.get(
      `https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`,
      config,
    );
    console.log('sleep result api', result);
    return result;
  }

  async getStressByDate(req: GetSleepByDateCommand): Promise<StressData> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
    const { date } = req;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: StressData = await this.httpClient.get(
      `https://api.fitbit.com/1/user/-/ecg/list.json?afterDate=${date}&sort=asc&limit=1&offset=0`,
      config,
    );
    console.log('stress result api', result);
    return result;
  }

  async getSpo2ByDate(req: GetSpo2ByDateCommand): Promise<SpO2Data> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
    const { date } = req;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: SpO2Data = await this.httpClient.get(
      `https://api.fitbit.com/1/user/-/spo2/date/${date}`,
      config,
    );
    console.log('spo2 result api', result);
    return result;
  }

  async getActivitiesByDate(
    req: GetActivitiesByDateCommand,
  ): Promise<ActivitiesData> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
    const { date } = req;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: ActivitiesData = await this.httpClient.get(
      `https://api.fitbit.com/1/user/-/activities/date/${date}`,
      config,
    );
    console.log('activities result api', result);
    return result;
  }
}

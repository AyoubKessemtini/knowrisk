import { AxiosInstance } from 'axios';
import { FitBitRepo } from '@core/domain/repositories/FitBitRepo';
import { GetHrvByDateCommand } from '@core/usecases/fitBitRepository/GetHrvByDate';
import { HRVData } from '@core/domain/entities/fitBitEntities/HrvByDate';

export class RDFitBit implements FitBitRepo {
  constructor(private httpClient: AxiosInstance) {}

  async getHrvbyDate(req: GetHrvByDateCommand): Promise<HRVData> {
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1BRQ1EiLCJzdWIiOiJDN1o2VE4iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJudXQgcnBybyByc2xlIHJjZiByYWN0IHJyZXMgcmxvYyByaHIgcnRlbSIsImV4cCI6MTcyNjcxMzExNywiaWF0IjoxNzI2Njg0MzE3fQ.Io5mrykRhmtO2RjY99K62gRCAQywQ72k0pUyZprnihA',
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
}

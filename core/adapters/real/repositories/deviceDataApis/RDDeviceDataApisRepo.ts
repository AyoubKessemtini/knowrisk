import { AxiosInstance } from 'axios';
import { DeviceDataApisRepo } from '@core/domain/repositories/deviceDataApis/DeviceDataApisRepo.ts';
import { HeartRateDeviceData } from '@core/entities/deviceDataApisEntity/HeartRate.ts';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import { StressDeviceData } from '@core/entities/deviceDataApisEntity/StressDeviceData.ts';
import { PatientData } from '@core/entities/deviceDataApisEntity/PatientData.ts';
import { Journal } from '@core/entities/deviceDataApisEntity/Journal.ts';
export class RDDeviceDataApisRepo implements DeviceDataApisRepo {
  constructor(private httpClient: AxiosInstance) {}

  baseUrl: string =
    'https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net';

  async getHeartRateWeeklyData(): Promise<HeartRateDeviceData[]> {
    const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
    const user = JSON.parse(userData!);
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const result = await this.httpClient.get(
      `${this.baseUrl}/api/patients/${user.id}/heart-rate/last-week`,
      config,
    );
    return result;
  }

  async getStressDailyData(date: string): Promise<StressDeviceData> {
    const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
    const user = JSON.parse(userData!);
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const result = await this.httpClient.get(
      `${this.baseUrl}/api/patients/${user.id}/stress-levels?date=${date}`,
      config,
    );
    return result;
  }

  async getSleepDailyData(date: string): Promise<SleepData> {
    const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
    const user = JSON.parse(userData!);
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const result = await this.httpClient.get(
      `${this.baseUrl}/api/patients/${user.id}/sleep?date=${date}`,
      config,
    );
    return result;
  }

  async getSpo2DailyData(date: string): Promise<Spo2Data> {
    const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
    const user = JSON.parse(userData!);
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const result = await this.httpClient.get(
      `${this.baseUrl}/api/patients/${user.id}/oxygen-saturation?date=${date}`,
      config,
    );
    return result;
  }

  async getPatientData(): Promise<PatientData> {
    const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
    const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
    const user = JSON.parse(userData!);
    // Add the Ocp-Apim-Subscription-Key to the request headers
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const result = await this.httpClient.get(
      `${this.baseUrl}/api/patients/${user.id}`,
      config,
    );
    return result;
  }
}

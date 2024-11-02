import { AxiosInstance } from 'axios';
import {DeviceDataApisRepo} from "@core/domain/repositories/deviceDataApis/DeviceDataApisRepo.ts";
import {HeartRateDeviceData} from "@core/entities/deviceDataApisEntity/HeartRate.ts";
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import {StressDeviceData} from "@core/entities/deviceDataApisEntity/StressDeviceData.ts";
export class RDDeviceDataApisRepo implements DeviceDataApisRepo {
    constructor(private httpClient: AxiosInstance) {}

    //user = useSelector((state: RootState) => state.auth.user);
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
         const result= await this.httpClient.get(
            `http://172.214.33.253:3001/api/patients/${user.id}/heart-rate/last-week`,
            config,
        );
         return result;
    }

    async getStressDailyData(date :string): Promise<StressDeviceData[]> {
        const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
        const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
        const user = JSON.parse(userData!);
        // Add the Ocp-Apim-Subscription-Key to the request headers
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const result= await this.httpClient.get(
            `http://172.214.33.253:3001/api/patients/${user.id}/stress-levels?date=${date}`,
            config,
        );
        return result;
    }
}

import {AxiosInstance} from 'axios';
import {DeviceHealthDataRepo} from '@core/domain/repositories/DeviceHealthDataRepo.ts';
import {PersistenceStorage} from "@storage/index.ts";
import {KEYS} from "@storage/Keys.ts";

export class RDDeviceHealthDataRepo implements DeviceHealthDataRepo {
    constructor(private httpClient: AxiosInstance) {
    }

    async SendDeviceHealthData(req: any): Promise<void> {
        // Add the Ocp-Apim-Subscription-Key to the request headers
        const config = {
            headers: {
                'Ocp-Apim-Subscription-Key': '9224774ccb564ecaa7be82cde6eec753',
            },
        };
        const userData = await PersistenceStorage.getItem(KEYS.USER_DATA);
        const user = JSON.parse(userData!);
        const result: any = await this.httpClient.post(
            'https://apim-dataworkflow-dev-us.azure-api.net/ReceiveData',
            {
                type: user.device_type,
                userId: user.id,
                data: req,
            },
            config,
        );
        return result;
    }
}

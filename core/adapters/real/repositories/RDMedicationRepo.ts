import {AxiosInstance} from "axios";
import {MedicationRepo} from "@core/domain/repositories/MedicationRepo.ts";
import {PersistenceStorage} from "@storage/index.ts";
import {KEYS} from "@storage/Keys.ts";
import {HeartRateDeviceData} from "@core/entities/deviceDataApisEntity/HeartRate.ts";

export class RDMedicationRepo implements MedicationRepo {
    constructor(private httpClient: AxiosInstance) {
    }

    baseUrl:string='http://172.214.33.253:3001';

    async addMedication(medication: Medication): Promise<any> {
        try {
            console.log(medication)
            const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
            // Add the Ocp-Apim-Subscription-Key to the request headers
            const config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const result= await this.httpClient.post(
                `${this.baseUrl}/api/patients/medication`,
                medication,
                config,
            );
            return result;
        }catch (e){
            console.log('add medication error')
            console.log(e)
        }
    }

    async getMedications(): Promise<Medication[]> {
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
            `${this.baseUrl}/api/patients/${user.id}/medications`,
            config,
        );
        // @ts-ignore
        return result.map((item) => ({
            id: item.id,
            title: item.title,
            dosage: item.dosage,
            frequency: item.frequency,
            schedule_message: item.schedule_message,
        }))
    }

    async deleteMedication( id:string): Promise<any> {
        const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
        // Add the Ocp-Apim-Subscription-Key to the request headers
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const result= await this.httpClient.delete(
            `${this.baseUrl}/api/patients/${id}/medication`,
            config,
        );
        return result
    }

}
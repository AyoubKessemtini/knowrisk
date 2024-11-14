import { UseCase } from 'core/usecases/Usecase';
import {DeviceDataApisRepo} from "@core/domain/repositories/deviceDataApis/DeviceDataApisRepo.ts";
import {PatientData} from "@core/entities/deviceDataApisEntity/PatientData.ts";

export class GetPatientData
    implements UseCase<null, Promise<PatientData>>
{
    constructor(private deviceDataApisRepo: DeviceDataApisRepo) {}

    public async execute(): Promise<PatientData | null> {
        try {
            return await this.deviceDataApisRepo.getPatientData();
        } catch (error) {
            return null;
        }
    }
}

import { UseCase } from '@core/usecases/Usecase.ts';
import { MedicationRepo } from '@core/domain/repositories/MedicationRepo.ts';


export class GetMedications
    implements UseCase<any, Promise<any>>
{
    constructor(private medicationRepo: MedicationRepo) {}

    public async execute(): Promise<Medication[]> {
        try {
            const medications=  await this.medicationRepo.getMedications();
            return medications
        } catch (error) {
            return [];
        }
    }
}

import { UseCase } from '@core/usecases/Usecase.ts';
import {MedicationRepo} from "@core/domain/repositories/MedicationRepo.ts";

export interface AddMedicationCommand {
    medication: Medication;
}

export class AddMedication
    implements UseCase<AddMedicationCommand, Promise<any>>
{
    constructor(private medicationRepo: MedicationRepo) {}

    public async execute(req: AddMedicationCommand): Promise<any | null> {
        try {
            return  await this.medicationRepo.addMedication(req.medication);
        } catch (error) {
            return null;
        }
    }
}

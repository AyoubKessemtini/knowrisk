import { UseCase } from '@core/usecases/Usecase.ts';
import { MedicationRepo } from '@core/domain/repositories/MedicationRepo.ts';

export interface DeleteMedicationCommand {
    id: string;
}
export class DeleteMedication
    implements UseCase<any, Promise<any>>
{
    constructor(private medicationRepo: MedicationRepo) {}

    public async execute( req: DeleteMedicationCommand): Promise<any> {
        try {
            return await this.medicationRepo.deleteMedication(req.id);
        } catch (error) {
            return null;
        }
    }
}

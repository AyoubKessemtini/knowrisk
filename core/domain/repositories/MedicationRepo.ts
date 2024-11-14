export interface MedicationRepo {
    addMedication(medication:Medication):Promise<any>
    deleteMedication(id:string):Promise<any>
    getMedications():Promise<Medication[]>
}
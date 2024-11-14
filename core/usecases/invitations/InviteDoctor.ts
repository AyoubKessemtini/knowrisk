import { UseCase } from 'core/usecases/Usecase';
import {InvitationRepo} from "@core/domain/repositories/InvitationRepo.ts";

export interface InviteDoctorCommand {
    email: string;
}

export class InviteDoctor
    implements UseCase<InviteDoctorCommand, Promise<any>>
{
    constructor(private invitationRepo: InvitationRepo) {}

    public async execute(req: InviteDoctorCommand): Promise<any | null> {
        try {
            return  await this.invitationRepo.inviteDoctor(req);
        } catch (error) {
            return null;
        }
    }
}

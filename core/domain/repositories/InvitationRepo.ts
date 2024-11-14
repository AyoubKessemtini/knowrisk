import { InviteDoctorCommand } from '@core/usecases/invitations/InviteDoctor.ts';

export interface InvitationRepo {
    inviteDoctor(req: InviteDoctorCommand): Promise<any>;
}

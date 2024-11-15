import {InvitationRepo} from "@core/domain/repositories/InvitationRepo.ts";
import {PersistenceStorage} from "@storage/index.ts";
import {KEYS} from "@storage/Keys.ts";
import {AxiosInstance} from "axios";
import {InviteDoctorCommand} from "@core/usecases/invitations/InviteDoctor.ts";

export class RDInvitationRepo implements InvitationRepo {
    constructor(private httpClient: AxiosInstance) {}
    //oldBaseUrl:string='http://172.214.33.253:3001'
    baseUrl:string='https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net';

    async inviteDoctor(req:InviteDoctorCommand): Promise<any> {
        try {
            console.log(req)
            const token = await PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
            // Add the Ocp-Apim-Subscription-Key to the request headers
            const config = {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            };
            const result= await this.httpClient.post(
                `${this.baseUrl}/api/invitations/P2D`,
                req,
                config,
            );
            console.log('invitation result')
            console.log(result)
            return result;
        }catch (e){
            console.log('invitation error')
            console.log(e)
        }
    }
}
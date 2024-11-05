import { UseCase } from 'core/usecases/Usecase';
import { ChatRepo } from '@core/domain/repositories/ChatRepo.ts';

export class SendMessage implements UseCase<null, Promise<string>> {
    constructor(private chatRepo: ChatRepo) {}

    public async execute(message: string): Promise<string | null> {
        try {
            return await this.chatRepo.sendMessage(message);
        } catch (error) {
            return null;
        }
    }
}

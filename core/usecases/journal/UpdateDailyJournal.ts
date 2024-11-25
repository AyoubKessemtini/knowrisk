import { UseCase } from '@core/usecases/Usecase.ts';
import { JournalRepo } from '@core/domain/repositories/JournalRepo.ts';

export interface UpdateDailyJournalCommand {
  answer: boolean;
  question_id: number;
}

export class UpdateDailyJournal implements UseCase<any, Promise<any>> {
  constructor(private journalRepo: JournalRepo) {}

  public async execute(req: UpdateDailyJournalCommand): Promise<any> {
    try {
      return await this.journalRepo.updateDailyJournal(req);
    } catch (error) {
      return null;
    }
  }
}

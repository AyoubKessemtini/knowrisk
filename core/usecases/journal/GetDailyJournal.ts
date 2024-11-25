import { UseCase } from '@core/usecases/Usecase.ts';
import { JournalRepo } from '@core/domain/repositories/JournalRepo.ts';
import { Journal } from '@core/entities/deviceDataApisEntity/Journal.ts';

interface GetDailyJournalCommand {
  date: string;
}

export class GetDailyJournal implements UseCase<any, Promise<any>> {
  constructor(private journalRepo: JournalRepo) {}

  public async execute(req: GetDailyJournalCommand): Promise<Journal[]> {
    try {
      return await this.journalRepo.getDailyJournal(req.date);
    } catch (error) {
      return [];
    }
  }
}

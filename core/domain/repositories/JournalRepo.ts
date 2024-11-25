import { Journal } from '@core/entities/deviceDataApisEntity/Journal.ts';
import { UpdateDailyJournalCommand } from '@core/usecases/journal/UpdateDailyJournal.ts';

export interface JournalRepo {
  getDailyJournal(date: string): Promise<Journal[]>;
  updateDailyJournal(req: UpdateDailyJournalCommand): Promise<any>;
}

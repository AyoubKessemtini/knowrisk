import { ExampleEntity } from '@core/entities/exampleConversations/ExampleEntity';
import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { ConversationsRepo } from 'core/domain/repositories/ConversationsRepo';
import { UseCase } from 'core/usecases/Usecase';
import { GetConversationsComnand } from './GetConversationsCommand';

type Response = ErrorOr<ExampleEntity[]>;

export class GetConversations
  implements UseCase<GetConversationsComnand, Promise<Response>>
{
  constructor(private conversationRepo: ConversationsRepo) {}

  public async execute(request: GetConversationsComnand): Promise<Response> {
    try {
      const { someKey } = request;
      const result = await this.conversationRepo.getConversations(someKey);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('GetConversations', error);
    }
  }
}

import { ExampleEntity } from '@core/entities/exampleConversations/ExampleEntity';

export interface ConversationsRepo {
  getConversations(someKey: string): Promise<ExampleEntity[]>;
}

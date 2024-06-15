import { ExampleEntity } from '@core/entities/exampleConversations/ExampleEntity';
import { ConversationsRepo } from 'core/domain/repositories/ConversationsRepo';
import { GetConversationsMapper } from '../mappers/conversationRepository/GetConversationsMapper';
import { AxiosInstance } from 'axios';

export class RDConversationsRepo implements ConversationsRepo {
  constructor(
    private httpClient: AxiosInstance,
    private getConversationsMapper: GetConversationsMapper,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getConversations(someKey: string): Promise<ExampleEntity[]> {
    const result = await this.httpClient.get('users');
    //THIS WILL FAIL, BECAUSE ENDPOINT IS PURE JSON
    const data = result.data.map((e: unknown) =>
      this.getConversationsMapper.toDomain(e),
    );
    return data;
  }
}

import { ExampleEntity } from '@core/entities/exampleConversations/ExampleEntity';
import { Mapper } from 'core/domain/models/Mapper';

export class GetConversationsMapper implements Mapper<ExampleEntity> {
  toDomain(raw: any): ExampleEntity {
    const { id, name, username, company } = raw;

    const result: ExampleEntity = {
      id,
      realName: name,
      userName: username,
      company: company.name,
    };
    return result;
  }
}

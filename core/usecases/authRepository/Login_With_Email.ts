import { Token } from '@core/domain/entities/Token';
import { ErrorOr, Result } from '@core/domain/models/ResultHandling';
import { AuthRepo } from '@core/domain/repositories/AuthRepo';
import { UseCase } from 'core/usecases/Usecase';

export interface LoginWithEmailCommand {
  email: string;
  password: string;
}

type Response = ErrorOr<Token>;

export class LoginWithEmail
  implements UseCase<LoginWithEmailCommand, Promise<Response>>
{
  constructor(private authRepo: AuthRepo) {}

  public async execute(request: LoginWithEmailCommand): Promise<Response> {
    try {
      const result = await this.authRepo.loginWithEmail(request);
      return Result.ok(result);
    } catch (error) {
      return Result.fail('LoginWithEmail', error);
    }
  }
}

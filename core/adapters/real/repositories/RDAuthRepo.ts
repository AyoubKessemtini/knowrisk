import { AxiosInstance } from 'axios';
import { Token } from '@core/domain/entities/Token';
import { AuthRepo } from '@core/domain/repositories/AuthRepo';
import { LoginWithEmailCommand } from '@core/usecases/authRepository/Login_With_Email';

export class RDAuthRepo implements AuthRepo {
  constructor(private httpClient: AxiosInstance) {}

  async loginWithEmail(req: LoginWithEmailCommand) {
    const result: Token = await this.httpClient.post('/user/signin/app', req);
    return result;
  }

  async signUp(req: LoginWithEmailCommand) {
    const result: Token = await this.httpClient.post(
      '/knowlepsy/user/signin/app',
      req,
    );
    return result;
  }

  // async checkEmail(req: CheckEmailCommand) {
  //   const result: Taken = await this.httpClient.post('api/common/email', req);
  //   return result;
  // }

  // async checkUsername(req: CheckUsernameCommand) {
  //   const result: UsernameValidity = await this.httpClient.post(
  //     'api/common/username',
  //     req,
  //   );
  //   return result;
  // }

  // async appleSignup(req: ProviderTokenCommand) {
  //   const result: Token & FirebaseToken = await this.httpClient.post(
  //     'api/user/register/apple',
  //     req,
  //   );
  //   return result;
  // }

  // async appleSignin(req: ProviderTokenCommand) {
  //   const result: Token & FirebaseToken = await this.httpClient.post(
  //     'api/user/auth/apple',
  //     req,
  //   );
  //   return result;
  // }

  // async googleSignup(req: ProviderTokenCommand) {
  //   const result: Token & FirebaseToken = await this.httpClient.post(
  //     'api/user/register/google',
  //     req,
  //   );
  //   return result;
  // }

  // async googleSignin(req: ProviderTokenCommand) {
  //   const result: Token & FirebaseToken = await this.httpClient.post(
  //     'api/user/auth/google',
  //     req,
  //   );
  //   return result;
  // }

  // async generatePasswordCode(req: GeneratePasswordCodeCommand) {
  //   const result: void = await this.httpClient.patch(
  //     'api/user/password/recovery',
  //     req,
  //   );
  //   return result;
  // }

  // async resetPassword(req: ResetPasswordCommand) {
  //   const result: void = await this.httpClient.patch(
  //     'api/user/password/reset',
  //     req,
  //   );
  //   return result;
  // }

  // async enrollDevice(req: EnrollDeviceCommand) {
  //   const result: void = await this.httpClient.post('api/user/device', req);
  //   return result;
  // }

  // async firebaseRefreshToken() {
  //   const result: Token = await this.httpClient.post(
  //     'api/user/auth/refresh-token',
  //   );
  //   return result;
  // }
}

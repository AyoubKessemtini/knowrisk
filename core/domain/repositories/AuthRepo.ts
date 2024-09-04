import { LoginWithEmailCommand } from '@core/usecases/authRepository/Login_With_Email';
import { Token } from '../entities/Token';

export interface AuthRepo {
  loginWithEmail(req: LoginWithEmailCommand): Promise<Token>;
  signUp(req: LoginWithEmailCommand): Promise<Token>;
  //   checkEmail(req: CheckEmailCommand): Promise<Taken>;
  //   checkUsername(req: CheckUsernameCommand): Promise<UsernameValidity>;

  //   appleSignin(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;
  //   appleSignup(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;
  //   googleSignup(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;
  //   googleSignin(req: ProviderTokenCommand): Promise<Token & FirebaseToken>;

  //   generatePasswordCode(req: GeneratePasswordCodeCommand): Promise<void>;
  //   resetPassword(req: ResetPasswordCommand): Promise<void>;

  //   enrollDevice(req: EnrollDeviceCommand): Promise<void>;
  //   firebaseRefreshToken(): Promise<Token>;
}

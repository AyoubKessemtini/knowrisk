import { core } from '@config/Configuration';
import { LoginWithEmailCommand } from '@core/usecases/authRepository/Login_With_Email';
// import { ProviderTokenCommand } from '@core/domain/entities/ProviderTokenCommand';
// import { CheckEmailCommand } from '@core/usecases/authRepo/CheckEmail';
// import { CheckUsernameCommand } from '@core/usecases/authRepo/CheckUsername';
// import { EnrollDeviceCommand } from '@core/usecases/authRepo/EnrollDevice';
// import { GeneratePasswordCodeCommand } from '@core/usecases/authRepo/GeneratePasswordCode';
// import { ResetPasswordCommand } from '@core/usecases/authRepo/ResetPassword';
// import { SignUpCommand } from '@core/usecases/authRepo/SignUp';
import { defaultQueryResult } from '@query/queryHelpers';

const loginWithEmail = async (command: LoginWithEmailCommand) => {
  const result = await core.loginWithEmail.execute(command);
  return defaultQueryResult(result);
};

// const signUp = async (command: SignUpCommand) => {
//   const result = await core.signUp.execute(command);
//   return defaultQueryResult(result);
// };

// const checkEmail = async (command: CheckEmailCommand) => {
//   const result = await core.checkEmail.execute(command);
//   return defaultQueryResult(result);
// };

// const checkUsername = async (command: CheckUsernameCommand) => {
//   const result = await core.checkUsername.execute(command);
//   return defaultQueryResult(result);
// };

// const appleSignup = async (command: ProviderTokenCommand) => {
//   const result = await core.appleSignup.execute(command);
//   return defaultQueryResult(result);
// };

// const appleSignin = async (command: ProviderTokenCommand) => {
//   const result = await core.appleSignin.execute(command);
//   return defaultQueryResult(result);
// };

// const googleSignup = async (command: ProviderTokenCommand) => {
//   const result = await core.googleSignup.execute(command);
//   return defaultQueryResult(result);
// };

// const googleSignin = async (command: ProviderTokenCommand) => {
//   const result = await core.googleSignin.execute(command);
//   return defaultQueryResult(result);
// };

// const generatePasswordCode = async (command: GeneratePasswordCodeCommand) => {
//   const result = await core.generatePasswordCode.execute(command);
//   return defaultQueryResult(result);
// };

// const resetPassword = async (command: ResetPasswordCommand) => {
//   const result = await core.resetPassword.execute(command);
//   return defaultQueryResult(result);
// };

// const enrollDevice = async (command: EnrollDeviceCommand) => {
//   const result = await core.enrollDevice.execute(command);
//   return defaultQueryResult(result);
// };

export const AuthQueryFunctions = {
  // resetPassword,
  loginWithEmail,
  // signUp,
  // checkEmail,
  // checkUsername,
  // appleSignup,
  // appleSignin,
  // googleSignup,
  // googleSignin,
  // generatePasswordCode,
  // enrollDevice,
};

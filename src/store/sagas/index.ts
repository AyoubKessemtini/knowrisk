import { all } from 'redux-saga/effects';
import { watchAuthSagas } from './authSaga'; // Import your auth saga
// Import other sagas here as needed
import { watchSubmitSeizureReport } from './reportSeizureSaga';
import { watchProfileSaga } from './profileSaga';
import { watchseizure } from './seizureSaga';
import { watchforgetPassword } from './forgetPasswordSaga';
import { watchgetPatient } from './getPatientSaga';
import { watchupdateProfile } from './updateProfileSaga';
import { watch } from 'fs';
import { watchforgetPasswordOTP } from './forgetPasswordOTPSaga';
import { watchdeleteSeizure } from './deleteSeizureSaga';
import { watchchangePassword } from './changePasswordSaga';
import { watchSubmitSeizureUpdateReport } from './reportSeizureUpdateSaga';

export default function* rootSaga() {
  yield all([
    watchAuthSagas(),
    watchProfileSaga(),
    watchSubmitSeizureReport(),
    watchseizure(),
    watchforgetPassword(),
    watchgetPatient(),
    watchupdateProfile(),
    watchforgetPasswordOTP(),
    watchdeleteSeizure(),
    watchchangePassword(),
    watchSubmitSeizureUpdateReport(),
    // Add other saga watchers here
  ]);
}

import { all } from 'redux-saga/effects';
import { watchAuthSagas } from './authSaga'; // Import your auth saga
// Import other sagas here as needed
import { watchSubmitSeizureReport } from './reportSeizureSaga';
import { watchProfileSaga } from './profileSaga';
import { watchseizure } from './seizureSaga';
import { watchforgetPassword } from './forgetPasswordSaga';
 
export default function* rootSaga() {
  yield all([
    watchAuthSagas(),
    watchProfileSaga(),
    watchSubmitSeizureReport(),
    watchseizure(), 
    watchforgetPassword(),// Add your auth saga watcher
    // Add other saga watchers here
  ]);
}

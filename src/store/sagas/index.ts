import { all } from 'redux-saga/effects';
import { watchAuthSagas } from './authSaga'; // Import your auth saga
// Import other sagas here as needed
import { watchSubmitSeizureReport } from './reportSeizureSaga';

export default function* rootSaga() {
  yield all([
    watchAuthSagas(), 
    watchSubmitSeizureReport(),// Add your auth saga watcher
    // Add other saga watchers here
  ]);
}

import { all } from 'redux-saga/effects';
import { watchAuthSagas } from './authSaga'; // Import your auth saga
// Import other sagas here as needed

export default function* rootSaga() {
  yield all([
    watchAuthSagas(), // Add your auth saga watcher
    // Add other saga watchers here
  ]);
}

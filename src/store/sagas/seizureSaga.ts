import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { seizureActions } from './seizureSlice';
import { SeizureEvent } from '@utils/types';
import { PayloadAction } from '@reduxjs/toolkit';

// Helper to retrieve the access token
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};

function* fetchSeizureForecastSaga(
  action: PayloadAction<{ id: string; month: string }>,
): SagaIterator {
  try {
    // Select data from Redux state if needed
    console.log('baseUrl fetchSeizureForecastSaga:');

    const state = yield select((state: RootState) => state.seizureForecast);
    const accessToken = getAccessToken();
    const baseUrl = 'http://172.214.33.253:3001/api/patients';
    console.log('baseUrl Seizure:', baseUrl.toString());

    const { id, month } = action.payload;
    const url = `${baseUrl}/${id}/seizures?month=${month}`;
    console.log('list Seizure:', url.toString());

    // Call the API
    const response: AxiosResponse<SeizureEvent[]> = yield call(axios.get, url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    // Handle successful response
    if (response.status === 200) {
      const events = response.data;
      const successMessage = 'Seizure forecast fetched successfully';
      yield put(
        seizureActions.fetchSeizureForecastSuccess({
          successMessage,
          events,
        }),
      );
    }
  } catch (error: any) {
    // Handle unexpected errors
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Network or server error. Please check your connection or try again later.';
    yield put(seizureActions.fetchSeizureForecastFailure(errorMessage));
  }
}

export function* watchseizure(): SagaIterator {
  yield takeLatest(
    seizureActions.fetchSeizureForecastRequest.type,
    fetchSeizureForecastSaga,
  );
}

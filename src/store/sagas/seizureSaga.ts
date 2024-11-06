import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { reportSeizureFormActions } from '@store/reportSeizureFormSlice';
import { seizureActions } from './seizureSlice';
import { SeizureEvent } from '@utils/types';
import { PayloadAction } from '@reduxjs/toolkit';

// Helper pour récupérer le token d'accès
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};

function* fetchSeizureForecastSaga(
  action: PayloadAction<{ id: string; month: string }>,
): Generator {
  try {
    // Récupérer les données de l'état Redux
    console.log('baseUrl fetchSeizureForecastSaga:');

    const state = yield select((state: RootState) => state.seizureForecast);
    const { events } = state;
    const accessToken = getAccessToken();
    // const baseUrl = 'http://172.214.33.253:3001/api/seizures';

    const baseUrl = 'http://172.214.33.253:3001/api/patients';
    console.log('baseUrl Seizure:', baseUrl.toString());

    const { id, month } = action.payload;
      const url = `${baseUrl}/${id}/seizures?&month=${month}`;
    // const url =
    //   'http://172.214.33.253:3001/api/patients/df8715e1-c724-44fc-86b5-316917360b1a/seizures?month=2024-11';
    // // Construct the URL with query parameters
    // const url = `${baseUrl}?id=${id}&month=${month}`;
    console.log('list Seizure:', url.toString());

    // Appel de l'API avec les données sous forme d'objet
    const response: AxiosResponse<SeizureEvent[]> = yield call(axios.get, url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    // Gérer le succès de la requête
    if (response.status === 200) {
      const events = response.data;
      yield put(seizureActions.fetchSeizureForecastSuccess(events));
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
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

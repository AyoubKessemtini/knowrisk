import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { getPatientFormActions, Patient } from '@store/getPatientSlice';

// Helper pour récupérer le token d'accès
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};

function* fetchgetPatientForecastSaga(
  action: PayloadAction<{ id: string; month: string }>,
): Generator {
  try {
    // Récupérer les données de l'état Redux
    console.log('baseUrl fetchgetPatientForecastSaga:');

    const state = yield select((state: RootState) => state.getPatientForm);

    const accessToken = getAccessToken();
    // const baseUrl = 'http://172.214.33.253:3001/api/getPatients';

    const { id } = action.payload;

    console.log('id PayloadAction:', id);
    const baseUrl = `http://172.214.33.253:3001/api/patients/${id}`;

    console.log('baseUrl getPatient:', baseUrl.toString());

    // const url =
    //   'http://172.214.33.253:3001/api/patients/df8715e1-c724-44fc-86b5-316917360b1a/getPatients?month=2024-11';
    // // Construct the URL with query parameters
    // const url = `${baseUrl}?id=${id}&month=${month}`;
    console.log('list getPatient:', baseUrl.toString());

    // Appel de l'API avec les données sous forme d'objet
    const response: AxiosResponse<Patient> = yield call(axios.get, baseUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('Response getpatient Status:', response.status);
    console.log('Response getpatient Data:', response.data);

    // Gérer le succès de la requête
    if (response.status === 200) {
      const patient: Patient = response.data;

      yield put(getPatientFormActions.submitgetPatientReportSuccess(patient));
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Network or server error. Please check your connection or try again later.';
    yield put(
      getPatientFormActions.submitgetPatientReportFailure(errorMessage),
    );
  }
}

export function* watchgetPatient(): SagaIterator {
  yield takeLatest(
    getPatientFormActions.submitgetPatientReportRequest.type,
    fetchgetPatientForecastSaga,
  );
}

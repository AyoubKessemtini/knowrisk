import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { reportSeizureFormActions } from '@store/reportSeizureFormSlice';

// Helper pour récupérer le token d'accès
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};

function* submitSeizureReportSaga(): SagaIterator {
  try {
    // Récupérer les données de l'état Redux
    const state = yield select((state: RootState) => state.reportSeizureForm);
    const { date, timeFrom, timeTo, alcohol, exercise, eat } = state;

    const accessToken = getAccessToken();
    const url = `http://172.214.33.253:3001/api/patients/report-seizure`;

    console.log('Data Seizure:', {
      date,
      time_from: timeFrom,
      time_to: timeTo,
      alcohol,
      exercise,
      eat,
    });

    // Appel de l'API avec les données sous forme d'objet
    const response: AxiosResponse = yield call(
      axios.post,
      url,
      {
        date,
        time_from: timeFrom + ':00',
        time_to: timeTo + ':00',
        alcohol,
        exercise,
        eat,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    // Gérer le succès de la requête
    if (response.status === 201) {
      const successMessage = response.data?.message || 'Submission successful';
      yield put(
        reportSeizureFormActions.submitSeizureReportSuccess(successMessage),
      );
    } else {
      const errorMessage = response.data?.message || 'Submission failed';
      yield put(
        reportSeizureFormActions.submitSeizureReportFailure(errorMessage),
      );
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Network or server error. Please check your connection or try again later.';
    yield put(
      reportSeizureFormActions.submitSeizureReportFailure(errorMessage),
    );
  }
}

export function* watchSubmitSeizureReport(): SagaIterator {
  yield takeLatest(
    reportSeizureFormActions.submitSeizureReportRequest.type,
    submitSeizureReportSaga,
  );
}
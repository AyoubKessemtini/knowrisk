import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { forgetPasswordActions } from '@store/forgetPasswordSlice';

// Helper pour récupérer le token d'accès
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};

function* forgetPasswordSaga(): SagaIterator {
  try {
    // Récupérer les données de l'état Redux
    const state = yield select((state: RootState) => state.forgetPassword);
    const { email } = state;
    console.log('email: forget-password', email);
    const accessToken = getAccessToken();
    const url = `https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net/api/auth/app/forgot-password`;

    // console.log('Data Seizure:', {
    //   date,
    //   time_from: timeFrom,
    //   time_to: timeTo,
    //   alcohol,
    //   exercise,
    //   eat,
    // });

    // Appel de l'API avec les données sous forme d'objet
    const response: AxiosResponse = yield call(
      axios.post,
      url,
      {
        email,
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
    if (response.status === 200 || response.status === 202) {
      const successMessage = response.data?.message || 'Submission successful';
      yield put(forgetPasswordActions.forgetPasswordSuccess(successMessage));
    } else {
      const errorMessage = response.data?.message || 'Submission failed';
      yield put(forgetPasswordActions.forgetPasswordFailure(errorMessage));
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
    console.log('Error: forget', error.message);
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Network or server error. Please check your connection or try again later.';
    yield put(forgetPasswordActions.forgetPasswordFailure(errorMessage));
  }
}

export function* watchforgetPassword(): SagaIterator {
  yield takeLatest(
    forgetPasswordActions.forgetPasswordRequest.type,
    forgetPasswordSaga,
  );
}

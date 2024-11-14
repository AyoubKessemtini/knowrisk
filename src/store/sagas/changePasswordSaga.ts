import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { changePasswordActions } from '@store/changePasswordSlice';

// Helper pour récupérer le token d'accès
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};

function* changePasswordSaga(): SagaIterator {
  try {
    // Récupérer les données de l'état Redux
    const state = yield select((state: RootState) => state.changePassword);
    const { oldPassword, password } = state; // Ensure 'password' is part of your state

    const accessToken = getAccessToken();
    const url = `http://172.214.33.253:3001/api/patients/password`;
    console.log('URL:', url);

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
      axios.put,
      url,
      {
        oldPassword,
        password,
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
      yield put(changePasswordActions.changePasswordSuccess(successMessage));
    } else {
      const errorMessage = response.data?.message || 'Submission failed';
      yield put(changePasswordActions.changePasswordFailure(errorMessage));
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
    console.log('Error: forget', error.message);
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Network or server error. Please check your connection or try again later.';
    yield put(changePasswordActions.changePasswordFailure(errorMessage));
  }
}

export function* watchchangePassword(): SagaIterator {
  yield takeLatest(
    changePasswordActions.changePasswordRequest.type,
    changePasswordSaga,
  );
}

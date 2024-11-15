import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { forgetPasswordOTPActions } from '@store/forgetPasswordOTPSlice';

// Helper pour récupérer le token d'accès
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};

function* forgetPasswordOTPSaga(): SagaIterator {
  try {
    // Récupérer les données de l'état Redux
    const state = yield select((state: RootState) => state.forgetPasswordOTP);
    const { otp, password } = state; // Ensure 'password' is part of your state

    console.log('email: forget-password', otp);
    const accessToken = getAccessToken();
    const url = `http://172.214.33.253:3001/api/auth/reset-password/${otp}`;

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
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    // Gérer le succès de la requête
    if (response.status === 200 || response.status === 202) {
      const successMessage = response.data?.message || 'Submission successful';
      yield put(
        forgetPasswordOTPActions.forgetPasswordOTPSuccess(successMessage),
      );
    } else {
      
      const errorMessage = response.data?.message || 'Submission failed';
      yield put(
        forgetPasswordOTPActions.forgetPasswordOTPFailure(errorMessage),
      );
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
    console.log('Error: forget', error.message);
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Network or server error. Please check your connection or try again later.';
    yield put(forgetPasswordOTPActions.forgetPasswordOTPFailure(errorMessage));
  }
}

export function* watchforgetPasswordOTP(): SagaIterator {
  yield takeLatest(
    forgetPasswordOTPActions.forgetPasswordOTPRequest.type,
    forgetPasswordOTPSaga,
  );
}

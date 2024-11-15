import { call, put, takeLatest, select } from 'redux-saga/effects';
import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';
import axios, { AxiosResponse } from 'axios';
import { updateProfileActions } from '@store/updateProfilSlice';
import * as base64 from 'base-64';

// Helper pour récupérer le token d'accès
const getAccessToken = (): string | null => {
  const tokenData = PersistenceStorage.getItem(KEYS.ACCESS_TOKEN);
  console.log('Access Token:', tokenData);
  return tokenData ? tokenData : null;
};
interface User {
  username: string;
  email: string;
  roles: string[];
  device_type: string;
  id: string;
}
interface CustomJwtPayload {
  user: User;
  iat: number;
  exp: number;
}
const base64UrlDecode = (str: string): CustomJwtPayload => {
  const base64String = str.replace(/-/g, '+').replace(/_/g, '/');
  const jsonString = base64.decode(base64String);
  return JSON.parse(jsonString);
};
function* updateProfileSaga(): SagaIterator {
  try {
    // Récupérer les données de l'état Redux
    const state = yield select((state: RootState) => state.updateProfile);
    const {
      first_name,
      last_name,
      email,
      phone,
      birthday,
      gender,
      height,
      weight,
      blood_type,
    } = state;

    const accessToken1 = getAccessToken();
    const url = `https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net/api/patients/profile`;

    // console.log('Data Seizure:', {
    //   date,
    //   time_from: timeFrom,
    //   time_to: timeTo,
    //   alcohol,
    //   exercise,
    //   eat,
    // });

    console.log('url Status:', url.toString());
    console.log(
      'url data :',
      JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        birthday,
        gender,
        height,
        weight,
        blood_type,
      }),
    );
    // Appel de l'API avec les données sous forme d'objet
    const response: AxiosResponse = yield call(
      axios.put,
      url,
      {
        first_name,
        last_name,
        email,
        phone,
        birthday,
        gender,
        height,
        weight,
        blood_type,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken1}`,
        },
      },
    );

    console.log('Response update profil Status:', response.status);
    console.log('Response update profil  Data:', response.data);

    // Gérer le succès de la requête
    if (response.status === 200 || response.status === 202) {
      const successMessage = 'Submission successful';
    //   const accessTokenJ =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGF5LnRheSIsImVtYWlsIjoidGF5QGdtYWlsLmNvbSIsInJvbGVzIjoiW1wiUGF0aWVudFwiXSIsImRldmljZV90eXBlIjoiRGV2aWNlIiwiaWQiOiI0Y2U2MjBhYi1hZjczLTQxNmUtYjFlMy01NmJiMjM4MzEzZDQifSwiaWF0IjoxNzMxMDU2NzcxLCJleHAiOjE3NjI2MTQzNzF9.Al5nGbxIFhVuBCnoMVAQ9BCcddWy0C2yq9lu-zdyVsQ';
      const { accessToken } = response.data;
      // console.log('Response Data accessTokenJ:', response.data);

      console.log('decode' + accessToken);

 
      const decodedToken: CustomJwtPayload = base64UrlDecode(
        accessToken.split('.')[1],
      );
      console.log('CustomJwtPayload' + decodedToken);

      if (accessToken) {
        console.log('PersistenceStorage:', PersistenceStorage); // Check if it's defined

        // Save token and user data in persistence storage
        yield call(
          [PersistenceStorage, PersistenceStorage.setItem],
          KEYS.ACCESS_TOKEN,
          accessToken,
        );

        yield call(
          [PersistenceStorage, PersistenceStorage.setItem],
          KEYS.USER_DATA,
          JSON.stringify(decodedToken.user),
        );
      }
      yield put(updateProfileActions.updateProfileSuccess(successMessage));
    } else {
      const errorMessage = response.data?.message || 'Submission failed';
      yield put(updateProfileActions.updateProfileFailure(errorMessage));
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
    console.log('Error: forget', error.message);
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Network or server error. Please check your connection or try again later.';
    yield put(updateProfileActions.updateProfileFailure(errorMessage));
  }
}

export function* watchupdateProfile(): SagaIterator {
  yield takeLatest(
    updateProfileActions.updateProfileRequest.type,
    updateProfileSaga,
  );
}

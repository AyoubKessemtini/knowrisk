import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { AuthActions } from '@store/authSlice';
import DeviceInfo from 'react-native-device-info';
import { PersistenceStorage } from '@storage/index';

import { KEYS } from '@storage/Keys';
import * as base64 from 'base-64';

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
// Base64 URL decode function
const base64UrlDecode = (str: string): CustomJwtPayload => {
  const base64String = str.replace(/-/g, '+').replace(/_/g, '/');
  const jsonString = base64.decode(base64String);
  return JSON.parse(jsonString);
};
// Login Saga
function* loginUser(action: any) {
  console.log('payload login' + JSON.stringify(action.payload, null, 2));

  try {
    const response = yield call(
      axios.post,
      'https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net/api/auth/app/login',
      action.payload,
    );

    //  console.log('API Response:', response.data.accessToken); // Log the entire response object
    ///    console.log('API status:', response.status); // Log the entire response object

    if (response.status === 200) {
      console.log("response.data register", response.data);
      const { accessToken } = response.data;
      console.log('decode' + accessToken);
      const decodedToken: CustomJwtPayload = base64UrlDecode(
        accessToken.split('.')[1],
      );

      console.log('CustomJwtPayload' + decodedToken);
      console.log(JSON.stringify(decodedToken.user));
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
          KEYS.IS_PROFILE_SET,
          'true',
        );
        yield call(
          [PersistenceStorage, PersistenceStorage.setItem],
          KEYS.USER_DATA,
          JSON.stringify(decodedToken.user),
        );
        yield put(AuthActions.setUser(decodedToken.user)); // Store user information in Redux state
        console.log('decodedToken.user:', decodedToken.user); // Check if it's defined

        // Dispatch success actions
        yield put(AuthActions.loginSuccess());
      }
      // Store user information; // Dispatch success action
    } else {
      const errorMessage = response.data?.message; // Adjust according to your API response structure
      yield put(AuthActions.loginFailure(errorMessage)); // Dispatch failure action
    }
  } catch (error) {
    console.log('catch' + error.message);
    const errorMessage = error.response.data.message;
    // if (error.response.status === 401) {
    //   errorMessage = error.response.data.message; // Handle network or other errors
    // } else errorMessage = error.message; // Handle network or other errors

    yield put(AuthActions.loginFailure(errorMessage)); // Dispatch failure action
  }
}

// Registration Saga
function* registerUser(action: any) {
  try {
    console.log(
      'payload registerUser' + JSON.stringify(action.payload, null, 2),
    );
    const userAgent = yield call(DeviceInfo.getUserAgent);

    const response = yield call(
      axios.post,
      'https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net/api/auth/app/register',
      action.payload,
      {
        headers: {
          'User-Agent': userAgent,
          'Content-Type': 'multipart/form-data', // Adjust as necessary for your API
        },
      },
    );
    const { accessToken } = response.data;
    console.log('decode' + accessToken);
    const decodedToken: CustomJwtPayload = base64UrlDecode(
      accessToken.split('.')[1],
    );

    if (response.status === 200 || response.status === 201) {
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
      //  yield call(
      //   [PersistenceStorage, PersistenceStorage.setItem],
      //   KEYS.onboarding_completed,
      //   'true',
      // );
      // yield call(
      //   [PersistenceStorage, PersistenceStorage.setItem],
      //   KEYS.IS_PROFILE_SET,
      //   'true',
      // );
      // yield call(
      //   [PersistenceStorage, PersistenceStorage.setItem],
      //   KEYS.onboarding_completed,
      //   'false',
      // );
      yield put(AuthActions.setUser(decodedToken.user)); // Store user information in Redux state
      console.log('decodedToken.user:', decodedToken.user); // Check if it's defined
      yield put(AuthActions.registerSuccess()); // Dispatch success action
    } else {
      console.log(response);
      const errorMessage = response.data?.message || 'Registration failed'; // Adjust according to your API response structure

      yield put(AuthActions.registerFailure(errorMessage)); // Dispatch failure action
    }
  } catch (error: unknown) {
    const errorMessage = error.response?.data.message || error.message; // Handle network or other errors

    yield put(AuthActions.registerFailure(errorMessage)); // Dispatch failure action
  }
}

// Watcher Saga
export function* watchAuthSagas() {
  yield takeLatest(AuthActions.loginRequest.type, loginUser); // Watch for login requests
  yield takeLatest(AuthActions.registerRequest.type, registerUser); // Watch for registration requests
}
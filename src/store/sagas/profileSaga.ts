import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { ProfileActions } from '@store/profileSlice';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';

// Define the data type for Profile
interface ProfileData {
  birthday: string;
  height: number;
  weight: number;
  blood_type: string;
  gender: string;
  device_type: string;
  answer: string;
}

const url = `https://knowrisk-b5hafebsage9dna6.eastus-01.azurewebsites.net/api/patients/profile`;

// Profile saga function to handle setProfileRequest
function* setProfileSaga(action: PayloadAction<ProfileData>) {
  console.log('setProfileSaga payload:', JSON.stringify(action.payload));

  const accessToken: string | null = yield call(
    [PersistenceStorage, PersistenceStorage.getItem],
    KEYS.ACCESS_TOKEN,
  );

  if (!accessToken) {
    Alert.alert('Error', 'Authentication required. Please log in again.');
    yield put(ProfileActions.setProfileFailure('Authentication required'));
    return;
  }

  try {
    const response: AxiosResponse = yield call(
      axios.post,
      url,
      action.payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.status === 200 || response.status === 201) {
      yield call(
        [PersistenceStorage, PersistenceStorage.setItem],
        KEYS.IS_PROFILE_SET,
        'true',
      );

      yield put(ProfileActions.setProfileSuccess(response.data.message));
   //   Alert.alert('Success', response.data.message);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Profile update failed';
    console.log('setProfileSaga error:', errorMessage);

    yield put(ProfileActions.setProfileFailure(errorMessage));
  //  Alert.alert('Error', errorMessage);
  }
}

// Watcher saga for profile actions
export function* watchProfileSaga() {
  yield takeLatest(ProfileActions.setProfileRequest.type, setProfileSaga);
}

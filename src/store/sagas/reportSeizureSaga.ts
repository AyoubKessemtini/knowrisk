// reportSeizureSaga.ts
import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';

import { RootState } from '@store/index';
import { SagaIterator } from 'redux-saga';
import {
  submitSeizureReportFailure,
  submitSeizureReportSuccess,
  submitSeizureReportRequest,
} from '@store/reportSeizureFormSlice';
import { PersistenceStorage } from '@storage/index';
import { KEYS } from '@storage/Keys';

function* submitSeizureReportSaga(): SagaIterator {
  try {
    // Récupérer les données de l'état Redux
    // Récupérer les données de l'état `reportSeizureForm` depuis Redux
    const state = yield select((state: RootState) => state.reportSeizureForm);
    const { date, timeFrom, timeTo, alcohol, exercise, eat } = state;

    // Afficher l'état complet de `reportSeizureForm` pour vérification
    console.log(
      "saga État complet de reportSeizureForm avant l'appel API :",
      state,
    );

    // if (date === undefined) {
    //   console.warn("Le champ 'date' est manquant ou indéfini.");
    // }
    // if (timeFrom === undefined) {
    //   console.warn("Le champ 'timeFrom' est manquant ou indéfini.");
    // }
    // if (timeTo === undefined) {
    //   console.warn("Le champ 'timeTo' est manquant ou indéfini.");
    // }
    // if (alcohol === undefined) {
    //   console.warn("Le champ 'alcohol' est manquant ou indéfini.");
    // }
    // if (exercise === undefined) {
    //   console.warn("Le champ 'exercise' est manquant ou indéfini.");
    // }

    // Assurez-vous que l'ID utilisateur est disponible dans l'état auth
    const userData = JSON.parse(
      PersistenceStorage.getItem(KEYS.USER_DATA) || '{}',
    );
    const userId = userData?.id;
    if (!userId) {
      yield put(
        submitSeizureReportFailure("L'ID utilisateur est introuvable."),
      );
      return;
    }

    const url = `http://172.214.33.253:3001/api/patients/${userId}/report-seizure`;
    // console.log(
    //   'Data Seizure: ' +
    //     JSON.stringify(
    //       {
    //         date,
    //         time_from: timeFrom,
    //         time_to: timeTo,
    //         alcohol,
    //         exercise,
    //         eat,
    //       },
    //       null,
    //       2, // Indente avec 2 espaces pour une meilleure lisibilité
    //     ),
    // );

    console.log('url seizure' + url);
    // Appel de l'API pour envoyer les données de saisie
    const response: AxiosResponse = yield call(axios.post, url, {
      date,
      time_from: timeFrom,
      time_to: timeTo,
      alcohol,
      exercise,
      eat,
    });

    // Gérer le succès ou les erreurs de la requête
    if (response.status === 200) {
      yield put(submitSeizureReportSuccess());
    } else if (response.status === 401) {
      yield put(
        submitSeizureReportFailure(
          'Non autorisé : l’utilisateur n’a pas les permissions nécessaires.',
        ),
      );
    } else if (response.status === 500) {
      yield put(
        submitSeizureReportFailure(
          'Erreur serveur : Veuillez réessayer plus tard.',
        ),
      );
    } else {
      yield put(
        submitSeizureReportFailure('Erreur inattendue, veuillez réessayer.'),
      );
    }
  } catch (error: any) {
    // Gestion des erreurs inattendues de l'API
    const errorMessage =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Erreur réseau ou serveur. Veuillez vérifier votre connexion ou réessayer plus tard.';
    yield put(submitSeizureReportFailure(errorMessage));
  }
}

export function* watchSubmitSeizureReport(): SagaIterator {
  yield takeLatest(submitSeizureReportRequest.type, submitSeizureReportSaga);
}

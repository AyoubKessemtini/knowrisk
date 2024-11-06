/* eslint-disable no-restricted-imports */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { homeSlice } from './homeSlice';
import { localeSlice } from './localeSlice';
import { authSlice } from './authSlice';
import { bleDataSlice } from '@store/bleDataSlice.ts';
import rootSaga from './sagas'; // Import your root saga
import { reportSeizureFormSlice } from './reportSeizureFormSlice';
import { ProfileSlice } from './profileSlice';
import { seizureSlice } from './sagas/seizureSlice';
import { forgetPasswordSlice } from './forgetPasswordSlice';
 

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine all reducers
const rootReducer = combineReducers({
  [homeSlice.name]: homeSlice.reducer,
  [localeSlice.name]: localeSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [bleDataSlice.name]: bleDataSlice.reducer,
  [ProfileSlice.name]: ProfileSlice.reducer, // Ajout du reducer reportSeizure
  [seizureSlice.name]: seizureSlice.reducer, // Ajout du reducer reportSeizure
  [forgetPasswordSlice.name]: forgetPasswordSlice.reducer, // Ajout du reducer reportSeizure

  [reportSeizureFormSlice.name]: reportSeizureFormSlice.reducer, // Ajout du reducer reportSeizure
});

// Create the Redux store and apply the saga middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // Add saga middleware
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks for dispatch and selector
export const useAppDispatch = useDispatch; // Correct usage of useDispatch
export const useAppSelector = useSelector; // Correct usage of useSelector

export { store };

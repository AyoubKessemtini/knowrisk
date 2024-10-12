/* eslint-disable no-restricted-imports */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { homeSlice } from './homeSlice';
import { localeSlice } from './localeSlice';
import { authSlice } from './authSlice';
import { bleDataSlice } from '@store/bleDataSlice.ts';

const rootReducer = combineReducers({
  [homeSlice.name]: homeSlice.reducer,
  [localeSlice.name]: localeSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [bleDataSlice.name]: bleDataSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { store };

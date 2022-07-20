import { createSelector } from '@reduxjs/toolkit';
import { AuthState } from '../feature/userSlice';
import { RootState } from '../store';

export const authSelector: (state: RootState) => AuthState = (
  state: RootState
) => state.auth;

export const userSelector = createSelector(authSelector, (auth) => {
  return auth.user;
});

export const isAuth = createSelector(authSelector, (auth) => {
  return auth.authenticated;
});

export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error
});

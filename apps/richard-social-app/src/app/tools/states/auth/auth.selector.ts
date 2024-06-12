import {createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState, RegisterState } from './auth.state';



export const LOGIN_STATE_NAME = 'auth';
export const REGISTER_STATE_NAME = 'register';

const getLoginState = createFeatureSelector<LoginState>(LOGIN_STATE_NAME);
const getRegistrationState = createFeatureSelector<RegisterState>(REGISTER_STATE_NAME);

export const isLoggedIn = createSelector(getLoginState, (state: LoginState) => {
  return state.user? true: false;
});

export const loggedInData = createSelector(getLoginState, (state: LoginState) => {
  return state.user;
});

export const isRegistered = createSelector(getRegistrationState, (state: RegisterState) => {
  return state.user? true: false;
});
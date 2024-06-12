import { createAction,props } from '@ngrx/store';


export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';

export const REGISTER_START = '[Auth] Register Start';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAIL = '[Auth] Register Fail';

export const LOGOUT = '[Auth] Logout';

export const loginStart = createAction(LOGIN_START, props<{ username: string, password: string }>());

export const loginSuccess = createAction(LOGIN_SUCCESS,props<{user:any}>());


export const registerStart = createAction(REGISTER_START, props<{ username:string,email: string, password: string }>());

export const registerSuccess = createAction(REGISTER_SUCCESS,props<{user:any}>());

export const logout = createAction(LOGOUT);
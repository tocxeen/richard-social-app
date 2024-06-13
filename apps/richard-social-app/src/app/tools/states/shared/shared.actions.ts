import { createAction,props } from '@ngrx/store';


export const SET_LOADING_ACTION = '[Shared State]  Loading Spinner';
export const SET_ERROR_MESSAGE = '[Shared State]  Error Message';
export const SET_SUCCESS_MESSAGE = '[Shared State]  Success Message';

export const setLoadingSpinner = createAction(SET_LOADING_ACTION,props<{status:boolean}>());

export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{message:string}>());

export const setSuccessMessage = createAction(SET_SUCCESS_MESSAGE, props<{message:string}>());
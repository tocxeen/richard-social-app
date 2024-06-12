import { createAction,props } from '@ngrx/store';


export const SET_LOADING_ACTION = '[Shared State] Set Loading Spinner';
export const SET_ERROR_MESSAGE = '[Shared State] Set Error Message';

export const setLoadingSpinner = createAction(SET_LOADING_ACTION,props<{status:boolean}>());

export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{message:string}>());
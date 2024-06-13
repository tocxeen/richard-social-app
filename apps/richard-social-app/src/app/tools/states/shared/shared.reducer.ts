import { createReducer,on } from '@ngrx/store';
import { initialState } from './shared.state';
import { setErrorMessage, setLoadingSpinner, setSuccessMessage } from './shared.actions';


const _sharedReducer = createReducer(initialState,
    on(setLoadingSpinner,(state:any,action:any) =>{
        return {...state,showLoading:action.status}
    }),
    on(setErrorMessage, (state:any, action:any) =>{
        return {...state, errorMessage:action.message}
    }),
    on(setSuccessMessage, (state:any, action:any) =>{
        return {...state, successMessage:action.message}
    })
)

export function SharedReducer(state:any,action:any){
    return _sharedReducer(state,action)
}
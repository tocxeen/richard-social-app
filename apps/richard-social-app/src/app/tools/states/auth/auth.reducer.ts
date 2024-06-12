import { loginSuccess, logout, registerSuccess } from "./auth.actions";
import { createReducer,on } from "@ngrx/store";
import { initialLoginState, initialRegisterState } from "./auth.state";

const _loginReducer = createReducer(initialLoginState,
    on(loginSuccess, (state:any, action:any)=>{
        return{
            ...state,
            user: action.user,
        }
    }),
    on(logout, (state) => ({
        ...state,
        user: null,
    }))
);

const _registerReducer = createReducer(initialRegisterState,
    on(registerSuccess, (state:any, action:any)=>{
        return{
            ...state,
            user: action.user,
        }
    }),
    on(logout, (state) => ({
        ...state,
        user: null,
    }))
);


export function LoginReducer(state:any, action:any) {
  return _loginReducer(state, action);

}
export function RegisterReducer(state:any, action:any) {
    return _registerReducer(state, action);
  
  }
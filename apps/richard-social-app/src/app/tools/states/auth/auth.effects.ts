import { Actions,createEffect,ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { loginStart, loginSuccess, logout, registerStart, registerSuccess } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Router } from '@angular/router';
import { AuthService } from '../../services';
import { setErrorMessage, setLoadingSpinner } from '../shared/shared.actions';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$:Actions, 
        private authService:AuthService,
        private store:Store<AppState>,
        private router:Router
    ) {}

    init$ = createEffect(() => this.actions$.pipe(
        ofType('[App] Initialize'),
        map(() => {
            if(typeof sessionStorage != 'undefined'){
          const tokenDataSession = sessionStorage.getItem('token_data');

          if (tokenDataSession) {
            const tokenData = JSON.parse(tokenDataSession);
            const user = this.authService.formatLoginData(tokenData);
            return loginSuccess({ user });
          }
        }
          return { type: 'NO_ACTION' };
        })
      ));

      

   login$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(loginStart),
        exhaustMap((action) => {
           return this.authService.
           login(action.username, action.password).
           pipe(map((data) => {
            this.store.dispatch(setErrorMessage({message:''}));
            this.store.dispatch(setLoadingSpinner({status:false}));
            const user = this.authService.formatLoginData(data);
            this.authService.setSessionData(data);
            return loginSuccess({user});
           }),
        catchError((errorResp:any)=>{
            this.store.dispatch(setLoadingSpinner({status:false}));
            const errorMessage = this.authService.formatErrorMessage(errorResp.error.detail);   
            return of(setErrorMessage({message:errorMessage}));
        }));
        }));
   });

   register$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(registerStart),
        exhaustMap((action) => {
           return this.authService.
           register(action.username ,action.email, action.password).
           pipe(map((data) => {
            this.store.dispatch(setErrorMessage({message:''}));
            this.store.dispatch(setLoadingSpinner({status:false}));
            const user = this.authService.formatUser(data);
            return registerSuccess({user});
           }),
        catchError((errorResp:any)=>{
            this.store.dispatch(setLoadingSpinner({status:false}));
            const errorMessage = this.authService.formatErrorMessage(errorResp.error.detail);   
            return of(setErrorMessage({message:errorMessage}));
        }));
        }));
   });

   logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      tap(() => {
        sessionStorage.removeItem('token_data');
        this.router.navigate(['/login']);
      })
    );
  }, { dispatch: false });


   loginRedirect$ = createEffect(()=>{
    return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action)=>{
            this.router.navigate(['/home'])
        }))
},{dispatch:false});

    registerRedirect$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(registerSuccess),
            tap((action)=>{
                this.router.navigate(['/login'])
            }))
    },{dispatch:false})


   
}
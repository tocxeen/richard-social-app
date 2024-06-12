import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loggedInData } from '../states/auth/auth.selector';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let store = inject(Store<AppState>);
  let token = '';

  if (req.url.includes('/login') || req.url.includes('/register')) {
    const authReq = req.clone({
      headers: req.headers.delete(
        'Authorization',
        sessionStorage.getItem('token')!
      ),
    });
    return next(authReq);
  }

  store.select(loggedInData).subscribe((data) => {
    of(data).subscribe((data) => {
      token = data?.access_token;
    });
  });
 

  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token),
  });

  return next(authReq);
};

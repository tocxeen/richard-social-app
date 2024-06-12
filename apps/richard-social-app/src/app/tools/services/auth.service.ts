import { User } from './../models/user.model';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Register, RegisterResponse } from "../models";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/auth/login-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { loggedInData } from '../states/auth/auth.selector';
import { Router } from '@angular/router';
import { logout } from '../states/auth/auth.actions';


@Injectable({
    providedIn: 'root'
    })
    export class AuthService {
        helper = new JwtHelperService();
        constructor( private http:HttpClient,private router: Router, private store:Store<AppState>) {}

        login(username:string, password:string):Observable<any>{
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            return this.http.post<any>(`${environment.baseUrl}/auth/login`, formData)
        }

        register(username:string,email:string,password:string):Observable<RegisterResponse>{
            const user:Register = {username,email,password};
            return this.http.post<RegisterResponse>(`${environment.baseUrl}/auth/register`, user)
        }

        formatUser(data:any){
            return  new User(data.token)
        }

        formatLoginData(data:any){
            return  new LoginResponse(data.access_token,data.token_type);
        }

        formatErrorMessage(message:string){
            switch(message){
                case 'Invalid Credentials':
                    return 'Try again, email or password is incorrect';

                case 'Invalid Username':
                    return 'Try again, email is incorrect';
                    
                default:
                    return 'Please try again';
            }
        }

        setSessionData(data:any){
            sessionStorage.setItem('token_data', JSON.stringify(data));
        }
    
        getSessionData(): any {
            const userData = sessionStorage.getItem('token_data');
            if (userData) {
              return JSON.parse(userData);
            }
            return null;
          }

          getDecodedAccessToken(token: string): any {
            return this.helper.decodeToken(token);
          }

          getUserName(){
            let userName;
            this.store.select(loggedInData).subscribe((data) => {
                of(data).subscribe((data) => {
                  userName = this.getDecodedAccessToken(data?.access_token)?.sub;
                });
              });
              return userName;
          }

          isTokenExpired() {
            if(typeof sessionStorage != 'undefined'){
            const isExpired = this.helper.isTokenExpired(sessionStorage.getItem('token_data'));
            const urls = ['/login','/sign-up']
            if(isExpired && !urls.includes(this.router.url)){
                this.store.dispatch(logout());
              return false;
            }
              return isExpired;
          }
          return false;
        }

    }
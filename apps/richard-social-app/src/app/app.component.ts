import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { AppState } from './tools/store/app.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getLoading } from './tools/states/shared/shared.selector';
import { isLoggedIn, loggedInData } from './tools/states/auth/auth.selector';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './shared/loader/loader.component';
import { FrameComponent } from './shared/frame/frame.component';
import { AuthService } from './tools/services';
import { loadPost } from './tools/states/post/post.action';

@Component({
  standalone: true,
  imports: [ RouterOutlet,CommonModule,LoaderComponent,FrameComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'richard-social-app';

  showLoading:Observable<boolean> | undefined;
  errorMessage:Observable<string> | undefined;
  isAuthenticated:Observable<boolean> | undefined;
  loggedInData:Observable<any> | undefined;

  constructor(private authService:AuthService,private store:Store<AppState>){}

  ngOnInit(): void {

    this.store.dispatch({ type: '[App] Initialize' });
    this.store.dispatch(loadPost());
   
      this.showLoading = this.store.select(getLoading);
      this.errorMessage =  this.store.select(getErrorMessage);
      this.isAuthenticated = this.store.select(isLoggedIn);
      this.loggedInData = this.store.select(loggedInData);

    
  }

}

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { environment } from './environments/environment';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { appReducer } from './tools/store/app.state';
import { AuthEffects } from './tools/states/auth/auth.effects';
import { REGISTER_STATE_NAME } from './tools/states/auth/auth.selector';
import { RegisterReducer } from './tools/states/auth/auth.reducer';
import { RegisterEffects } from './tools/states/post/post.effects';
import { errInterceptor } from './tools/interceptors/err.interceptor';
import { tokenInterceptor } from './tools/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes), provideAnimationsAsync(),
    provideHttpClient(withFetch(),withInterceptors([errInterceptor, tokenInterceptor])),
    provideStore(appReducer),
    provideEffects(AuthEffects,RegisterEffects),
    provideState(REGISTER_STATE_NAME, RegisterReducer),
    { provide: 'baseUrl', useValue: environment.baseUrl }
],
};

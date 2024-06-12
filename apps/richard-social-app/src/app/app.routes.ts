import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostsComponent } from './pages/posts/posts.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { AuthGuard } from './tools/interceptors/auth-guard';
import { DashboardComponent } from './pages/dasboard/dashboard.component';

export const appRoutes: Route[] = [

    {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
    { path:'posts', component:PostsComponent},
    { path:'dashboard', component:DashboardComponent},

    { path:'login', component:LoginComponent},
    { path:'sign-up', component:SignUpComponent},

    { path:'', redirectTo: 'dashboard', pathMatch: 'full' },
    { path:'**', component:PageNotFoundComponent }
    
];

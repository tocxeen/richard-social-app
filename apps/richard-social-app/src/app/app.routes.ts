import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostsComponent } from './pages/posts/posts.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';

export const appRoutes: Route[] = [
    
    {path:'home',component:HomeComponent},
    { path:'posts', component:PostsComponent},
    { path:'friends', component:FriendsComponent},

    { path:'login', component:LoginComponent},
    { path:'sign-up', component:SignUpComponent},

    { path:'', redirectTo: 'home', pathMatch: 'full' },
    { path:'**', component:PageNotFoundComponent }
    
];

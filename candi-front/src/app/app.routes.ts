// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './base/auth/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {CandidatureComponent} from './pages/candidature/candidature.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'candidature', component: CandidatureComponent },
      { path: '', redirectTo: 'candidatures', pathMatch: 'full' }
    ]
  }
];

import { Routes } from '@angular/router';
import {authGuard} from './base/auth/auth.guard';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

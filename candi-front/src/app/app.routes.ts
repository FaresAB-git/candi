// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './base/auth/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {CandidatureComponent} from './pages/candidature/candidature.component';
import {CandiDetailComponent} from './pages/candi-detail/candi-detail.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'candidatures/nouvelle', component: CandiDetailComponent, canActivate: [authGuard] },
  { path: 'candidatures/:id', component: CandiDetailComponent, canActivate: [authGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'candidatures', component: CandidatureComponent },
      { path: '', redirectTo: 'candidatures', pathMatch: 'full' }
    ]
  }
];

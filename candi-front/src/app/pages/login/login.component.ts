import {Component, inject, OnInit, signal} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {InputComponent} from '../../components/input/input.component';
import {ButtonComponent} from '../../components/button/button.component';
import {AuthService} from '../../base/auth/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginRequest} from '../../base/mapping/authentification.mapping';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    InputComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  loginError = signal<string | null>(null);

  fgLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required]),
  });

  login(): void {
    this.loginError.set(null);

    if (!this.fgLogin.valid) {
      return;
    }

    const login: LoginRequest = {
      email: this.fgLogin.controls.email.value!,
      motDePasse: this.fgLogin.controls.motDePasse.value!
    };

    this.authService.login(login).subscribe({
      next: () => {
        this.router.navigate(['/candidature']);
      },
      error: () => {
        this.loginError.set('Identifiants invalides');
      }
    });
  }
}

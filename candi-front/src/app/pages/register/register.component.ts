import {Component, inject} from '@angular/core';
import {AuthService} from '../../base/auth/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginRequest} from '../../base/mapping/authentification.mapping';
import {InputComponent} from '../../components/input/input.component';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    InputComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {

  authService = inject(AuthService);

  fgLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    motDePasse: new FormControl('', [Validators.required]),
  })

  register(){
    console.log("login");
    console.log(this.fgLogin.valid);
    if(!this.fgLogin.valid){
      return;
    }

    const register: LoginRequest = {
      email: this.fgLogin.controls.email.value!,
      motDePasse: this.fgLogin.controls.motDePasse.value!
    }

    const token = this.authService.register(register).subscribe({
      next: result => {
        console.log(result);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}

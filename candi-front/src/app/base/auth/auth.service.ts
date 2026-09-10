import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {AuthResponse, LoginRequest, RegisterRequest} from '../mapping/authentification.mapping';
import {BaseService} from '../entity/beseService';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  private readonly baseUrl = `${this.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'auth_token';

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap(response => this.setToken(response.token))
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(
      tap(response => this.setToken(response.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}

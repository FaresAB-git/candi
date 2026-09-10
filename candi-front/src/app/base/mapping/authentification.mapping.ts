export interface RegisterRequest {
  email: string;
  motDePasse: string;
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface AuthResponse {
  token: string;
}

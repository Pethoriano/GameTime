import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'game-time-token';

  constructor() { }

  // Guarda o token no localStorage do navegador
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Recupera o token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Remove o token (logout)
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Verifica se o utilizador está logado
  isLoggedIn(): boolean {
    return !!this.getToken(); // Retorna true se o token existir
  }
}
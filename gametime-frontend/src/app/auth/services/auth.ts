import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'game-time-token';
  // URL para o endpoint de login no backend
  private loginUrl = 'http://localhost:8081/api/login';

  private registerUrl = 'http://localhost:8081/api/login/register';

  // 1. Injete o HttpClient
  constructor(private http: HttpClient) { }

  // 2. Adicione o método de login
  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  register(credentials: any): Observable<any> {
    return this.http.post(this.registerUrl, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
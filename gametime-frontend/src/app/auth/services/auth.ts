import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'game-time-token';
  private readonly API_BASE_URL = 'http://localhost:8081/api';
  private readonly loginUrl = `${this.API_BASE_URL}/login`;
  private readonly registerUrl = `${this.API_BASE_URL}/login/register`;

  constructor(private http: HttpClient) { }

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

  logout(): void {
    this.removeToken();
  }
}


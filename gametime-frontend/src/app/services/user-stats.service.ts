import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStats } from '../models/user-stats.model';

@Injectable({
  providedIn: 'root'
})
export class UserStatsService {
  private readonly API_BASE_URL = 'http://localhost:8081/api';
  private readonly apiUrl = `${this.API_BASE_URL}/stats`;

  constructor(private http: HttpClient) {}

  getUserStats(): Observable<UserStats> {
    return this.http.get<UserStats>(this.apiUrl);
  }
}


import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameRequest } from '../models/game.model';

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly API_BASE_URL = 'http://localhost:8081/api';
  private readonly apiUrl = `${this.API_BASE_URL}/games`;

  constructor(private http: HttpClient) { }

  getGames(page: number, size: number, sort?: string, filter?: string, status?: string): Observable<Page<Game>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }
    
    if (filter) {
      params = params.set('nome', filter);
    }
    
    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Page<Game>>(this.apiUrl, { params });
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  addGame(game: GameRequest): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  updateGame(id: number, game: GameRequest): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${id}`, game);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


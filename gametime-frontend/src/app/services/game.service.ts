import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

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
  private apiUrl = 'http://localhost:8081/api/games';

  constructor(private http: HttpClient) { }

  // ADICIONE O PARÂMETRO 'filter'
  getGames(page: number, size: number, sort?: string, filter?: string): Observable<Page<Game>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }
    // Adiciona o parâmetro de filtro (que o backend espera como 'nome')
    if (filter) {
      params = params.set('nome', filter);
    }

    return this.http.get<Page<Game>>(this.apiUrl, { params });
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  addGame(game: Partial<Game>): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  updateGame(id: number, game: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${id}`, game);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
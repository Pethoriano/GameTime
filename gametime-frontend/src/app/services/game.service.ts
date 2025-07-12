import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model'; // 1. IMPORTE A INTERFACE

// Interface para a resposta paginada do Spring
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

  // 2. USE A TIPAGEM NOS MÉTODOS
  getGames(page: number, size: number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  // O parâmetro 'game' agora pode ser um tipo parcial, pois não inclui o ID
  addGame(game: Partial<Game>): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  updateGame(id: number, game: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${id}`, game);
  }

  deleteGame(id: number): Observable<any> { // Delete não retorna conteúdo, pode ser any ou {}
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
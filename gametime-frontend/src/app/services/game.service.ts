import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8081/api/games'; // URL do seu backend

  constructor(private http: HttpClient) { }

  // Método para buscar todos os jogos (paginado)
  getGames(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  // Adicione este método ao seu game.service.ts
  addGame(game: any): Observable<any> {
    return this.http.post(this.apiUrl, game);
  }

  // Adicione este método ao seu game.service.ts
  deleteGame(id: number): Observable<any> {
    // Usamos `backticks` para construir a URL com o ID do jogo
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Adicione estes dois métodos ao seu game.service.ts

  // Busca um único jogo pelo seu ID
  getGameById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Atualiza um jogo existente
  updateGame(id: number, game: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, game);
  }

  // Adicione aqui outros métodos (getById, save, update, delete)
}
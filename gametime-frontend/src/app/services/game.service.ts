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

  // Adicione aqui outros métodos (getById, save, update, delete)
}
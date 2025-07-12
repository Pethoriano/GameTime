import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.html', // Usando .html como no seu projeto
  styleUrls: ['./game-list.scss'] // Usando .scss como no seu projeto
})
// O nome da classe deve ser o mesmo que importamos nas rotas
export class GameListComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames(0, 10).subscribe(response => {
      this.games = response.content;
    });
  }
}
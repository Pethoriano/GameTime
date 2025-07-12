import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 1. IMPORTE O ROUTERMODULE

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule // 2. ADICIONE-O AQUI
  ],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameListComponent implements OnInit {
  games: any[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames(0, 10).subscribe(response => {
      this.games = response.content;
    });
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este jogo?')) {
      this.gameService.deleteGame(id).subscribe({
        next: () => {
          console.log('Jogo deletado com sucesso');
          this.games = this.games.filter(game => game.id !== id);
        },
        error: (error) => {
          console.error('Erro ao deletar o jogo', error);
        }
      });
    }
  }
}
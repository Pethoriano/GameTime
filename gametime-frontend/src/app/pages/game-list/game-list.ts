import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../models/game.model';
import { FormsModule } from '@angular/forms'; // 1. IMPORTE FormsModule

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // 2. ADICIONE FormsModule
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 8;
  currentSort = 'nome,asc';
  currentFilter = ''; // Agora vamos usar esta propriedade diretamente

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames(); // Chamada inicial
  }

  // Método único para carregar os jogos com todos os parâmetros
  loadGames(): void {
    this.gameService.getGames(this.currentPage, this.pageSize, this.currentSort, this.currentFilter)
      .subscribe(response => {
        this.games = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      });
  }

  // Este método agora é chamado diretamente pelo input
  onFilterChange(): void {
    this.currentPage = 0; // Reseta para a primeira página ao filtrar
    this.loadGames();
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSort = selectElement.value;
    this.currentPage = 0;
    this.loadGames();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadGames();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadGames();
    }
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este jogo?')) {
      this.gameService.deleteGame(id).subscribe({
        next: () => this.loadGames(),
        error: (error) => console.error('Erro ao deletar o jogo', error)
      });
    }
  }
}
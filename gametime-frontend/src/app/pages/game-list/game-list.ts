import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 8;
  currentSort = 'nome,asc';
  // --- Nova propriedade para o filtro ---
  currentFilter = '';

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames(this.currentPage);
  }

  // --- Modificado para usar o filtro atual ---
  loadGames(page: number): void {
    this.gameService.getGames(page, this.pageSize, this.currentSort, this.currentFilter).subscribe(response => {
      this.games = response.content;
      this.currentPage = response.number;
      this.totalPages = response.totalPages;
    });
  }

  // --- Novo método para lidar com a mudança no filtro ---
  onFilterChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.currentFilter = inputElement.value;
    this.loadGames(0); // Volta para a primeira página ao filtrar
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSort = selectElement.value;
    this.loadGames(0);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadGames(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadGames(this.currentPage - 1);
    }
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este jogo?')) {
      this.gameService.deleteGame(id).subscribe({
        next: () => {
          this.loadGames(this.currentPage);
        },
        error: (error) => console.error('Erro ao deletar o jogo', error)
      });
    }
  }
}
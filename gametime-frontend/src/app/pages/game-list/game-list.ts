import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../models/game.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 8;
  currentSort = 'nome,asc';
  searchControl = new FormControl('');

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames(this.currentPage, this.currentSort, '');

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(filterValue => {
        this.currentPage = 0;
        return this.gameService.getGames(this.currentPage, this.pageSize, this.currentSort, filterValue || '');
      })
    ).subscribe(response => {
      this.games = response.content;
      this.totalPages = response.totalPages;
    });
  }

  // O método loadGames agora é mais simples e chamado para paginação/ordenação
  loadGames(page: number, sort: string, filter: string): void {
    // --- CORREÇÃO AQUI ---
    // Adicionamos 'this.pageSize' que estava faltando
    this.gameService.getGames(page, this.pageSize, sort, filter).subscribe(response => {
      this.games = response.content;
      this.currentPage = response.number;
      this.totalPages = response.totalPages;
    });
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSort = selectElement.value;
    this.loadGames(0, this.currentSort, this.searchControl.value || '');
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadGames(this.currentPage + 1, this.currentSort, this.searchControl.value || '');
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadGames(this.currentPage - 1, this.currentSort, this.searchControl.value || '');
    }
  }

  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este jogo?')) {
      this.gameService.deleteGame(id).subscribe({
        next: () => {
          this.loadGames(this.currentPage, this.currentSort, this.searchControl.value || '');
        },
        error: (error) => console.error('Erro ao deletar o jogo', error)
      });
    }
  }
}
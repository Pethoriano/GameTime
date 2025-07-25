import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Game } from '../../models/game.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.scss']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 8;
  currentSort = 'nome,asc';
  currentFilter = '';
  currentStatus = '';
  viewMode: 'grid' | 'list' = 'grid';
  isLoading = false;

  private readonly VIEW_MODE_STORAGE_KEY = 'gameListViewMode';

  constructor(
    private gameService: GameService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGames();
    this.loadViewModePreference();
  }

  private loadViewModePreference(): void {
    const savedViewMode = localStorage.getItem(this.VIEW_MODE_STORAGE_KEY) as 'grid' | 'list';
    if (savedViewMode) {
      this.viewMode = savedViewMode;
    }
  }

  loadGames(): void {
    this.isLoading = true;
    
    this.gameService.getGames(
      this.currentPage, 
      this.pageSize, 
      this.currentSort, 
      this.currentFilter, 
      this.currentStatus
    ).subscribe({
      next: (response) => {
        this.games = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar jogos:', error);
        this.isLoading = false;
      }
    });
  }

  onFilterChange(): void {
    this.currentPage = 0;
    this.loadGames();
  }

  onSortChange(event?: any): void {
    this.currentPage = 0;
    this.loadGames();
  }

  onStatusChange(): void {
    this.currentPage = 0;
    this.loadGames();
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    localStorage.setItem(this.VIEW_MODE_STORAGE_KEY, this.viewMode);
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
    localStorage.setItem(this.VIEW_MODE_STORAGE_KEY, this.viewMode);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadGames();
    }
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

  deleteGame(id: number): void {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
      this.gameService.deleteGame(id).subscribe({
        next: () => {
          this.loadGames();
        },
        error: (error) => {
          console.error('Erro ao excluir jogo:', error);
        }
      });
    }
  }

  editGame(id: number): void {
    this.router.navigate(['/editar', id]);
  }

  viewGameDetails(id: number): void {
    this.router.navigate(['/detalhes', id]);
  }

  getStatusIcon(status: string): string {
    const statusIcons: { [key: string]: string } = {
      'JOGADO': '✅',
      'JOGANDO': '🎮',
      'JOGAREI': '📅',
      'BACKLOG': '📚'
    };
    return statusIcons[status] || '❓';
  }

  getStatusText(status: string): string {
    const statusTexts: { [key: string]: string } = {
      'JOGADO': 'Jogado',
      'JOGANDO': 'Jogando',
      'JOGAREI': 'Jogarei',
      'BACKLOG': 'Backlog'
    };
    return statusTexts[status] || status;
  }

  getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
  }

  get hasGames(): boolean {
    return this.games.length > 0;
  }

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  get isLastPage(): boolean {
    return this.currentPage >= this.totalPages - 1;
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'JOGADO': 'badge-jogado',
      'JOGANDO': 'badge-jogando',
      'JOGAREI': 'badge-jogarei',
      'BACKLOG': 'badge-backlog'
    };
    return statusClasses[status] || 'badge-secondary';
  }

  onDelete(id: number): void {
    this.deleteGame(id);
  }

  trackByGameId(index: number, game: Game): number {
    return game.id;
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/game-placeholder.png';
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
  }

  clearFilters(): void {
    this.currentFilter = '';
    this.currentStatus = '';
    this.currentPage = 0;
    this.loadGames();
  }
}


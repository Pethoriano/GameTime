import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4" *ngIf="game">
      <div class="row">
        <div class="col-md-4">
          <img [src]="game.imagem" [alt]="game.nome" class="img-fluid rounded shadow">
        </div>
        <div class="col-md-8">
          <h1 class="mb-3">{{ game.nome }}</h1>
          
          <div class="row mb-3">
            <div class="col-sm-6">
              <strong>Nota:</strong> 
              <span class="badge bg-primary ms-2">{{ game.nota }}/10</span>
            </div>
            <div class="col-sm-6">
              <strong>Status:</strong> 
              <span class="badge ms-2" [ngClass]="getStatusClass(game.status)">
                {{ getStatusText(game.status) }}
              </span>
            </div>
          </div>

          <div class="row mb-3" *ngIf="game.horasJogadas">
            <div class="col-sm-6">
              <strong>Horas Jogadas:</strong> {{ game.horasJogadas }}h
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-6" *ngIf="game.dataAdicao">
              <strong>Data de Adição:</strong> {{ formatDate(game.dataAdicao) }}
            </div>
            <div class="col-sm-6" *ngIf="game.dataFinalizacao">
              <strong>Data de Finalização:</strong> {{ formatDate(game.dataFinalizacao) }}
            </div>
          </div>

          <div class="mb-3" *ngIf="game.avaliacao">
            <strong>Avaliação:</strong>
            <p class="mt-2">{{ game.avaliacao }}</p>
          </div>

          <div class="mt-4">
            <button class="btn btn-primary me-2" (click)="editGame()">
              Editar
            </button>
            <button class="btn btn-danger me-2" (click)="deleteGame()">
              Excluir
            </button>
            <button class="btn btn-secondary" (click)="goBack()">
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4" *ngIf="!game && !loading">
      <div class="alert alert-warning">
        Jogo não encontrado.
      </div>
      <button class="btn btn-secondary" (click)="goBack()">
        Voltar
      </button>
    </div>

    <div class="container mt-4" *ngIf="loading">
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Carregando...</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .img-fluid {
      max-height: 400px;
      object-fit: cover;
    }
  `]
})
export class GameDetailsComponent implements OnInit {
  game: Game | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadGame(+id);
    }
  }

  loadGame(id: number) {
    this.gameService.getGameById(id).subscribe({
      next: (game) => {
        this.game = game;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar jogo:', error);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'JOGADO': return 'bg-success';
      case 'JOGANDO': return 'bg-warning';
      case 'JOGAREI': return 'bg-info';
      case 'BACKLOG': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'JOGADO': return 'Jogado';
      case 'JOGANDO': return 'Jogando';
      case 'JOGAREI': return 'Jogarei';
      case 'BACKLOG': return 'Backlog';
      default: return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  editGame() {
    if (this.game) {
      this.router.navigate(['/editar', this.game.id]);
    }
  }

  deleteGame() {
    if (this.game && confirm('Tem certeza que deseja excluir este jogo?')) {
      this.gameService.deleteGame(this.game.id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro ao excluir jogo:', error);
          alert('Erro ao excluir jogo');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}


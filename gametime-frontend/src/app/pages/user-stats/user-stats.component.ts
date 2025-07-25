import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatsService } from '../../services/user-stats.service';
import { UserStats } from '../../models/user-stats.model';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h1 class="mb-4">Suas Estatísticas</h1>
      
      <div class="row" *ngIf="stats && !loading">
        <div class="col-md-3 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Total de Jogos</h5>
              <h2 class="text-primary">{{ stats.totalJogos }}</h2>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Jogos Zerados</h5>
              <h2 class="text-success">{{ stats.jogosZerados }}</h2>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Jogando Atualmente</h5>
              <h2 class="text-warning">{{ stats.jogosJogando }}</h2>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">No Backlog</h5>
              <h2 class="text-secondary">{{ stats.jogosBacklog }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4" *ngIf="stats && !loading">
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Total de Horas Jogadas</h5>
              <h2 class="text-info">{{ stats.totalHorasJogadas }}h</h2>
              <p class="text-muted">
                Aproximadamente {{ getDaysFromHours(stats.totalHorasJogadas) }} dias
              </p>
            </div>
          </div>
        </div>
        
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body text-center">
              <h5 class="card-title">Média das Notas</h5>
              <h2 class="text-primary">{{ stats.mediaNotas.toFixed(1) }}/10</h2>
              <div class="progress mt-2">
                <div class="progress-bar" 
                     [style.width.%]="(stats.mediaNotas / 10) * 100"
                     role="progressbar">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4" *ngIf="stats && !loading">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Resumo da Coleção</h5>
              <div class="row">
                <div class="col-md-6">
                  <p><strong>Taxa de Conclusão:</strong> 
                    {{ getCompletionRate() }}%
                  </p>
                  <p><strong>Jogo Favorito:</strong> 
                    <span class="text-muted">Baseado na maior nota</span>
                  </p>
                </div>
                <div class="col-md-6">
                  <p><strong>Tempo Médio por Jogo:</strong> 
                    {{ getAverageHoursPerGame() }}h
                  </p>
                  <p><strong>Próximo Objetivo:</strong> 
                    <span class="text-muted">Zerar {{ stats.jogosJogando }} jogo(s)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-4" *ngIf="loading">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>

      <div class="container mt-4" *ngIf="!stats && !loading">
        <div class="alert alert-info">
          <h4>Nenhuma estatística disponível</h4>
          <p>Adicione alguns jogos à sua coleção para ver suas estatísticas!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
    }
  `]
})
export class UserStatsComponent implements OnInit {
  stats: UserStats | null = null;
  loading = true;

  constructor(private userStatsService: UserStatsService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.userStatsService.getUserStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        this.loading = false;
      }
    });
  }

  getDaysFromHours(hours: number): number {
    return Math.round(hours / 24);
  }

  getCompletionRate(): number {
    if (!this.stats || this.stats.totalJogos === 0) return 0;
    return Math.round((this.stats.jogosZerados / this.stats.totalJogos) * 100);
  }

  getAverageHoursPerGame(): number {
    if (!this.stats || this.stats.totalJogos === 0) return 0;
    return Math.round(this.stats.totalHorasJogadas / this.stats.totalJogos);
  }
}


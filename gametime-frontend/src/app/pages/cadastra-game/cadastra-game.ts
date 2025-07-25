import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastra-game',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cadastra-game.html',
  styleUrls: ['./cadastra-game.scss']
})
export class CadastraGameComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  gameId: number | null = null;
  isSubmitting = false;
  showSuccessMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      nota: [null, [Validators.required, Validators.min(0), Validators.max(10)]],

      avaliacao: [''],
      status: [null, Validators.required],
      horasJogadas: [0, [Validators.min(0)]]
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.gameId = +id;
      this.loadGameData();
    }
  }

  private loadGameData(): void {
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe({
        next: (game) => {
          this.form.patchValue(game);
        },
        error: (error) => {
          console.error('Erro ao carregar dados do jogo:', error);
          this.router.navigate(['/']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const gameData = this.form.value;
      
      const operation = this.isEditMode 
        ? this.gameService.updateGame(this.gameId!, gameData)
        : this.gameService.addGame(gameData);

      operation.subscribe({
        next: (response) => {
          console.log('Jogo salvo com sucesso!', response);
          this.showSuccessMessage = true;
          
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: (error) => {
          console.error('Erro ao salvar o jogo:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  goBack(): void {
    this.location.back();
  }

  getCharacterCount(): number {
    const avaliacao = this.form.get('avaliacao')?.value || '';
    return avaliacao.length;
  }

  // Getters para facilitar validação no template
  get nome() { return this.form.get('nome'); }
  get nota() { return this.form.get('nota'); }
  get status() { return this.form.get('status'); }
  get horasJogadas() { return this.form.get('horasJogadas'); }
  get avaliacao() { return this.form.get('avaliacao'); }

}

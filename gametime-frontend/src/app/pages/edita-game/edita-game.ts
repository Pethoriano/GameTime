import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-edita-game',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edita-game.html',
  styleUrls: ['./edita-game.scss']
})
export class EditaGameComponent implements OnInit {
  form!: FormGroup;
  gameId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute // Usado para ler parâmetros da URL
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário (igual ao de cadastro)
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      nota: [null, [Validators.min(1), Validators.max(10)]],
      imagem: ['', Validators.required],
      avaliacao: [''],
      status: [null, Validators.required]
    });

    // Captura o ID da URL e busca os dados do jogo
    this.gameId = this.route.snapshot.params['id'];
    if (this.gameId) {
      this.gameService.getGameById(this.gameId).subscribe(gameData => {
        // Preenche o formulário com os dados recebidos da API
        this.form.patchValue(gameData);
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Chama o serviço para ATUALIZAR o jogo
      this.gameService.updateGame(this.gameId, this.form.value).subscribe({
        next: () => {
          console.log('Jogo atualizado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Erro ao atualizar o jogo', err)
      });
    }
  }
}
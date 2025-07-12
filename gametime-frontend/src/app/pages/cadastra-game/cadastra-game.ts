import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common'; // <-- IMPORTE

@Component({
  selector: 'app-cadastra-game',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule // <-- ADICIONE AQUI
  ],
  templateUrl: './cadastra-game.html',
  styleUrls: ['./cadastra-game.scss']
})
export class CadastraGameComponent implements OnInit {
  // O resto do seu código continua o mesmo...
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      nota: [null, [Validators.min(1), Validators.max(10)]],
      imagem: ['', Validators.required],
      avaliacao: [''],
      status: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.gameService.addGame(this.form.value).subscribe({
        next: (response) => {
          console.log('Jogo salvo com sucesso!', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro ao salvar o jogo', error);
        }
      });
    } else {
      console.log("Formulário inválido");
    }
  }
}
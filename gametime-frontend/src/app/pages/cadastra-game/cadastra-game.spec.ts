import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- Importe o Router
import { GameService } from '../../services/game.service'; // <-- Importe o GameService

@Component({
  selector: 'app-cadastra-game',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './cadastra-game.html',
  styleUrls: ['./cadastra-game.scss']
})
export class CadastraGameComponent implements OnInit {
  form!: FormGroup;

  // Injetamos o GameService e o Router
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
      // Chamamos o serviço para salvar o jogo
      this.gameService.addGame(this.form.value).subscribe({
        next: (response) => {
          console.log('Jogo salvo com sucesso!', response);
          // Em caso de sucesso, navegamos de volta para a home
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erro ao salvar o jogo', error);
          // Aqui você poderia exibir uma mensagem de erro para o usuário
        }
      });
    } else {
      console.log("Formulário inválido");
    }
  }
}
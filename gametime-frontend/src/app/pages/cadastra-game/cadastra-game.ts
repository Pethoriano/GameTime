import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <-- Importado

@Component({
  selector: 'app-cadastra-game',
  standalone: true,
  imports: [
    ReactiveFormsModule // <-- Adicionado
  ],
  templateUrl: './cadastra-game.html',
  styleUrls: ['./cadastra-game.scss']
})
export class CadastraGameComponent implements OnInit {
  // FormGroup representa nosso formulário
  form!: FormGroup;

  // Injetamos o FormBuilder para nos ajudar a criar o formulário
  constructor(private formBuilder: FormBuilder) {}

  // ngOnInit é o lugar perfeito para criar o formulário
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      // Definimos os campos do formulário e suas validações
      nome: ['', Validators.required],
      nota: [null, [Validators.min(1), Validators.max(10)]],
      imagem: ['', Validators.required],
      avaliacao: [''],
      status: [null, Validators.required]
    });
  }

  // Método que será chamado ao enviar o formulário
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); // Por enquanto, apenas exibiremos no console
      // Próximo passo: enviar para a API
    } else {
      console.log("Formulário inválido");
    }
  }
}
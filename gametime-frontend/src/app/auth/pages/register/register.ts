import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // <-- CORRIGIDO AQUI

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  registerError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.registerError = '';
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro no registo', err);
          this.registerError = err.error.message || 'Erro ao registar. Tente outro nome de utilizador.';
        }
      });
    }
  }
}
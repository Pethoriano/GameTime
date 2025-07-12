import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth'; // <-- CORRIGIDO AQUI

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loginError = false;

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
    this.loginError = false;
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro de login', err);
          this.loginError = true;
        }
      });
    }
  }
}
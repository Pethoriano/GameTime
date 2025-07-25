import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-buttons" *ngIf="isLoggedIn(); else showLogin">
      <button class="btn btn-auth-logout" (click)="logout()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-1">
          <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Logout
      </button>
    </div>
    <ng-template #showLogin>
      <div class="auth-buttons">
        <a class="btn btn-auth-login me-2" routerLink="/login">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-1">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Login
        </a>
        <a class="btn btn-auth-register" routerLink="/register">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-1">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="8.5" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            <path d="M20 8V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23 11H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Registrar
        </a>
      </div>
    </ng-template>
  `,
  styles: [`
    .auth-buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-auth-login {
      background-color: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-md);
      font-weight: 500;
      transition: all var(--transition-fast);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
    }

    .btn-auth-login:hover {
      background-color: var(--primary-color);
      color: white;
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
      text-decoration: none;
    }

    .btn-auth-register {
      background-color: var(--primary-color);
      color: white;
      border: 2px solid var(--primary-color);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-md);
      font-weight: 500;
      transition: all var(--transition-fast);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
    }

    .btn-auth-register:hover {
      background-color: var(--primary-dark);
      border-color: var(--primary-dark);
      color: white;
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
      text-decoration: none;
    }

    .btn-auth-logout {
      background-color: transparent;
      color: var(--danger-color);
      border: 2px solid var(--danger-color);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-md);
      font-weight: 500;
      transition: all var(--transition-fast);
      display: inline-flex;
      align-items: center;
      font-size: 0.875rem;
      cursor: pointer;
    }

    .btn-auth-logout:hover {
      background-color: var(--danger-color);
      color: white;
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .btn-auth-logout:focus,
    .btn-auth-login:focus,
    .btn-auth-register:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    /* Responsividade para mobile */
    @media (max-width: 991.98px) {
      .auth-buttons {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--gray-200);
        justify-content: center;
      }

      .btn-auth-login,
      .btn-auth-register,
      .btn-auth-logout {
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
      }
    }

    /* Estados de foco para acessibilidade */
    .btn-auth-login:focus-visible,
    .btn-auth-register:focus-visible,
    .btn-auth-logout:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    /* Animação dos ícones */
    .btn-auth-login svg,
    .btn-auth-register svg,
    .btn-auth-logout svg {
      transition: transform var(--transition-fast);
    }

    .btn-auth-login:hover svg,
    .btn-auth-register:hover svg,
    .btn-auth-logout:hover svg {
      transform: scale(1.1);
    }
  `]
})
export class AuthStatusComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}


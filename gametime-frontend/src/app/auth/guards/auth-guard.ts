import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Se o utilizador está logado, permite o acesso
  }

  // Se não está logado, redireciona para a página de login
  return router.parseUrl('/login');
};
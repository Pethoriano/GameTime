import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list';
import { CadastraGameComponent } from './pages/cadastra-game/cadastra-game';
import { EditaGameComponent } from './pages/edita-game/edita-game';
import { LoginComponent } from './auth/pages/login/login';
import { RegisterComponent } from './auth/pages/register/register';
// --- Importe o novo guard ---
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // --- Rotas Protegidas ---
  // A propriedade 'canActivate' diz ao Angular para usar o nosso guard nestas rotas
  {
    path: 'cadastrar',
    component: CadastraGameComponent,
    canActivate: [authGuard]
  },
  {
    path: 'editar/:id',
    component: EditaGameComponent,
    canActivate: [authGuard]
  }
];
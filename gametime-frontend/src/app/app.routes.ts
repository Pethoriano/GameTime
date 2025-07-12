import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list';
import { CadastraGameComponent } from './pages/cadastra-game/cadastra-game';
import { EditaGameComponent } from './pages/edita-game/edita-game';
// --- Importe os novos componentes ---
import { LoginComponent } from './auth/pages/login/login';
import { RegisterComponent } from './auth/pages/register/register';


export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'cadastrar', component: CadastraGameComponent },
  { path: 'editar/:id', component: EditaGameComponent },
  // --- Adicione as novas rotas ---
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
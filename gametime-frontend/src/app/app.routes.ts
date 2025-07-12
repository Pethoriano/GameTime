import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list';
import { CadastraGameComponent } from './pages/cadastra-game/cadastra-game';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'cadastrar', component: CadastraGameComponent }
];
import { Routes } from '@angular/router';
// Importando do arquivo game-list.ts
import { GameListComponent } from './pages/game-list/game-list';
// Importando do arquivo cadastra-game.ts
import { CadastraGameComponent } from './pages/cadastra-game/cadastra-game';
import { EditaGameComponent } from './pages/edita-game/edita-game';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'cadastrar', component: CadastraGameComponent },
  { path: 'editar/:id', component: EditaGameComponent }
];
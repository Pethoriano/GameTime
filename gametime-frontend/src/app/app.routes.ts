import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list';
// O caminho agora está correto e importa a classe com o nome corrigido
import { CadastraGameComponent } from './pages/cadastra-game/cadastra-game';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'cadastrar', component: CadastraGameComponent }
];
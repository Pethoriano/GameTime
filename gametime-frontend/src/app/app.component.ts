import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { CommonModule } from '@angular/common'; // <-- IMPORTE O CommonModule
import { HttpClientModule } from '@angular/common/http'; // <-- IMPORTE O HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true, // <-- MARQUE COMO STANDALONE
  imports: [
    CommonModule, // <-- ADICIONE O CommonModule AQUI
    HttpClientModule // <-- ADICIONE O HttpClientModule AQUI
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // <-- CORRIJA PARA .scss
})
export class AppComponent implements OnInit {
  title = 'GameTime';
  games: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames(0, 8).subscribe(response => {
      this.games = response.content;
    });
  }
}
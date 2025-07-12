import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import RouterLink, RouterOutlet, and RouterModule
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // Add RouterModule to the imports array
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gametime-frontend';
}
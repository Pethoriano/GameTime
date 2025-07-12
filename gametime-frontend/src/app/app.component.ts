import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importe também o RouterLinkActive
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Adicione o RouterLinkActive ao array de imports
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gametime-frontend';
}
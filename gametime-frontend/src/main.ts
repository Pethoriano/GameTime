import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // <-- IMPORTE
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // <-- IMPORTE

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // <-- ADICIONE
  ]
})
  .catch((err) => console.error(err));
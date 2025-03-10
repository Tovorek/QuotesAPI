import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'QuoteManagement';
}

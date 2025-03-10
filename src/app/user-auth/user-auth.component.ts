import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  imports: [RouterOutlet],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {

}

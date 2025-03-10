import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent {
  constructor(private router: Router,private authService: AuthService) { }
  onLogout() {
    this.router.navigateByUrl('/login');
  }

}

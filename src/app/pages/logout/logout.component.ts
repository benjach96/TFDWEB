import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(authService: AuthService, router: Router) {
    console.log('Logging out');
    authService.logout();
    console.log('Logged out');
    router.navigate(['/login']);
  }
}

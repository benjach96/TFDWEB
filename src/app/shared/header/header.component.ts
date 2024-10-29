import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PostUsuarioDTO } from '../../model/postUsuarioDTO';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser: PostUsuarioDTO;
  constructor(userService: AuthService) {
    this.currentUser = userService.getUser()!;
  }
}

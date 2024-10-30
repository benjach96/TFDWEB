import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostUsuarioDTO } from '../../model/postUsuarioDTO';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser: PostUsuarioDTO;
  constructor(securityService: SecurityService) {
    this.currentUser = securityService.getUser()!;
  }
}

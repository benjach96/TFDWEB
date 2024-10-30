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
  //currentUser: PostUsuarioDTO;
  constructor(private securityService: SecurityService) {
    //this.currentUser = securityService.getUser()!;
    //console.log('HeaderComponent constructor currentUser', this.currentUser);

    // Nota: Este componente es reusado por Angular, entonces el constructor y el ngOnInit no siempre
    // se ejecutan, por lo que se debe obtener el usuario actual en el método getCurrentUser.
    // Una alternativa podria ser "subscribirse" a un BehaviorSubject en el servicio de seguridad,
    // pero eso es más complicado y se sale del alcance de este ejemplo.
  }

  getCurrentUser(): PostUsuarioDTO {
    const user = this.securityService.getUser()!;
    //console.log('HeaderComponent getCurrentUser', user);
    return user;
  }
}

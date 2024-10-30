import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { VerificarCredencialesInput } from '../model/verificarCredencialesInput';
import { PostUsuarioDTO } from '../model/postUsuarioDTO';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private backend: BackendService, private security: SecurityService) { }

  async login(email: string, password: string): Promise<boolean> {
    const input: VerificarCredencialesInput = {
      email: email,
      password: password
    };

    const user = await this.backend.users.verificarCredenciales(input);
    if (!user) {
      this.security.clearAuthenticatedUser();
      return false;
    }

    this.security.setAuthenticatedUser(user);

    return true;
  }

  logout() {
    this.security.clearAuthenticatedUser();
  }
}

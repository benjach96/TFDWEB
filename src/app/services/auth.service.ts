import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { VerificarCredencialesInput } from '../model/verificarCredencialesInput';
import { PostUsuarioDTO } from '../model/postUsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private backend: BackendService) { }


  isAuthenticated(): boolean {
    return (this.getUser() != null);
  }

  getUserId(): number | null {
    var user = this.getUser();

    return user?.usuarioId ?? 0;
  }

  getUser(): PostUsuarioDTO | null {
    let user: string | null = null;

    if (typeof window !== 'undefined') {
      user = sessionStorage.getItem('user');
    }

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  setAuthenticatedUser(user: PostUsuarioDTO) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  clearAuthenticatedUser() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('user');
    }
  }

  login(email: string, password: string): boolean {
    const input: VerificarCredencialesInput = {
      email: email,
      password: password
    };

    const user = this.backend.users.verificarCredenciales(input);
    if (!user) {
      this.clearAuthenticatedUser();
      return false;
    }

    this.setAuthenticatedUser(user);

    return true;
  }

  logout() {
    this.clearAuthenticatedUser();
  }
}

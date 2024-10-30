import { Injectable } from '@angular/core';
import { PostUsuarioDTO } from '../model/postUsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

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
      console.log('clearAuthenticatedUser');
      //sessionStorage.removeItem('user');
      sessionStorage.clear();
    }
  }
}

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PostUsuarioDTO } from '../model/postUsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  readonly USER_KEY:string = 'user';

  constructor(private cookieService: CookieService) { }

  isAuthenticated(): boolean {
    return (this.getUser() != null);
  }

  getUserId(): number | null {
    var user = this.getUser();

    return user?.usuarioId ?? 0;
  }

  getUser(): PostUsuarioDTO | null {
    let user: string | null = null;

    //if (typeof window !== 'undefined') {
      user = this.cookieService.get(this.USER_KEY);
    //}

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }

  setAuthenticatedUser(user: PostUsuarioDTO) {
    //if (typeof window !== 'undefined') {
      this.cookieService.set(this.USER_KEY, JSON.stringify(user));
    //}
  }

  clearAuthenticatedUser() {
    //if (typeof window !== 'undefined') {
      this.cookieService.delete(this.USER_KEY);
    //}
  }
}

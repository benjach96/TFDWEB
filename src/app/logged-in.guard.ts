import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const userService=inject(AuthService);

  if (!userService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};

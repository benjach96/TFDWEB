import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SecurityService } from './services/security.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const securityService=inject(SecurityService);

  if (!securityService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};

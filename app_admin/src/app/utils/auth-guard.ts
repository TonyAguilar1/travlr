import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authentication } from '../services/authentication';

// Route guard: only let logged-in users reach admin pages (add/edit trip).
// Anyone else is sent to the login page instead.
export const authGuard: CanActivateFn = () => {
  const authenticationService = inject(Authentication);
  const router = inject(Router);

  if (authenticationService.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/login');
};

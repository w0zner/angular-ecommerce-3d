import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService)
  let router = inject(Router)

  let user = authService.getStoredUser()

  if(user) {
    return true
  } else {
    router.navigate(['/signin'])
    return false
  }
};

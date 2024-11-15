import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const navcontroller = inject(NavController);
  
  if (!authService.isAuthenticated()) {
    navcontroller.navigateRoot('/auth/login');
    return false;
  }

  return true;
};

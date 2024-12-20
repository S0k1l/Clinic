import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackBar = inject(MatSnackBar);

  if(inject(AuthService).isLoggedIn()){
    return true
  }
  
  matSnackBar.open('Ви повинні увійти, щоб переглянути цю сторінку', 'Ок', {
    duration: 3000,
  });
  
  return false;
};

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // ✅ accès autorisé
  } else {
    router.navigate(['/login']); // ❌ redirection vers login
    return false;
  }
};

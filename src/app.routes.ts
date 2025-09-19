import { Routes } from '@angular/router';
import { authGuardFn } from './app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    loadComponent: () =>
      import('./app/features/accueil/accueil.component').then(m => m.AccueilComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./app/features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./app/features/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./app/features/cart/cart.component').then(m => m.CartComponent)
  },
  {
path: 'profile',
loadComponent: () =>
  import('./app/features/profile/profile.component').then(m => m.ProfileComponent),
canActivate: [authGuardFn]
  },

  {
    path: '**',
    loadComponent: () =>
      import('./app/features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

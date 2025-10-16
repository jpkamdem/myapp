import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Connectez-vous',
    loadComponent: () =>
      import('./public/login//login/login').then((module) => module.Login),
  },
  {
    path: 'register',
    title: 'Inscrivez-vous',
    loadComponent: () =>
      import('./public/register/register/register').then(
        (module) => module.Register
      ),
  },
  {
    path: '',
    title: 'Accueil',
    loadComponent: () =>
      import('./protected/home/home').then((module) => module.Home),
  },
];

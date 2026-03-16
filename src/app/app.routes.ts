import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((module) => module.Home),
    title: 'Accueil | ATOS Angular 21 Workshop'
  },
  {
    path: 'exercise-1',
    loadComponent: () =>
      import('./pages/exercise-1/exercise-1').then((module) => module.Exercise1),
    title: 'Exercice 1 : Standalone | ATOS Angular 21 Workshop'
  },
  {
    path: 'exercise-2',
    loadComponent: () =>
      import('./pages/exercise-2/exercise-2').then((module) => module.Exercise2),
    title: 'Exercice 2 : Controle de flux et @let | ATOS Angular 21 Workshop'
  },
  {
    path: 'exercise-3',
    loadComponent: () => import('./pages/exercise-3/exercise-3').then((module) => module.Exercise3),
    title: 'Exercice 3 : Signals | ATOS Angular 21 Workshop'
  },
  {
    path: 'exercise-3-5',
    loadComponent: () =>
      import('./pages/exercise-3-5/exercise-3-5').then((module) => module.Exercise35),
    title: 'Exercice 3.5 : Signals et input/output | ATOS Angular 21 Workshop'
  },
  {
    path: 'exercise-4',
    loadComponent: () =>
      import('./pages/exercise-4/exercise-4').then((module) => module.Exercise4),
    title: 'Exercice 4 : Interop RxJS et Signals | ATOS Angular 21 Workshop'
  },
  {
    path: 'exercise-5',
    loadComponent: () =>
      import('./pages/exercise-5/exercise-5').then((module) => module.Exercise5),
    title: 'Exercice 5 : NgRx Signal Store | ATOS Angular 21 Workshop'
  },
  {
    path: 'exercise-6',
    loadComponent: () =>
      import('./pages/exercise-6/exercise-6').then((module) => module.Exercise6),
    title: 'Exercice 6 : Signal Forms | ATOS Angular 21 Workshop'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

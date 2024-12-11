import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'previsiones',
    loadComponent: () => import('./pages/previsiones/previsiones.page').then( m => m.PrevisionesPage)
  }
];

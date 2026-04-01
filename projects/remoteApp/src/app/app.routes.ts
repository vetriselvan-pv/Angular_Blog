import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'flag',
    loadComponent: () => import('./page/flag-list/flag-list').then((m) => m.FlagList),
  },
  {
    path : 'custom-decorator',
    loadComponent : () => import('./page/custom-decorator/custom-decorator').then((m) => m.CustomDecorator)
  }
];

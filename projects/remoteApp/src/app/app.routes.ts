import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'flag',
    loadComponent: () => import('./page/flag-list/flag-list').then((m) => m.FlagList),
  },
  {
    path : 'family-tree',
    loadComponent : () => import('./page/family-tree/family-tree').then((m) => m.FamilyTree)
  },
  {
    path : '',
    redirectTo : '/family-tree',
    pathMatch : 'full'
  }
];

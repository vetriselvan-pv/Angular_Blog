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
    path : 'custom-decorator',
    loadComponent : () => import('./page/custom-decorator/custom-decorator').then((m) => m.CustomDecorator)
  },
  {
    path: 'signal-form',
    loadComponent: () => import('./page/signal-form/signal-form').then((m) => m.SignalForm)
  },
  {
    path: 'periodic-table',
    loadComponent: () => import('./page/periodic-table/periodic-table').then((m) => m.PeriodicTable)
  },
  {
    path : '',
    redirectTo : '/periodic-table',
    pathMatch: 'full'
  }
];

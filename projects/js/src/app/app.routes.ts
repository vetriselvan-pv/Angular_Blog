import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'docs/promise-all'
  },
  {
    path: 'login',
    loadComponent: () => import('./page/login/login').then((component) => component.LoginComponent)
  },
  {
    path: 'write',
    loadComponent: () => import('./page/write/write').then((component) => component.WriteComponent)
  },
  {
    path: 'docs/:docId',
    loadComponent: () =>
      import('./page/docs-viewer/docs-viewer').then((component) => component.DocsViewerComponent)
  },
  {
    path: '**',
    redirectTo: 'docs/promise-all'
  }
];

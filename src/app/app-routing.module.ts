import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)},
  {path: 'productos', loadChildren: () => import('./routes/product.routes')},
  {path: 'admin', loadChildren: () => import('./routes/admin.routes')},
  {path: '**', loadComponent: () => import('./pages/notFound/notFound.component').then(mod => mod.NotFoundComponent)}
];

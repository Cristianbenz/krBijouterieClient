import { Routes } from '@angular/router';
import { ProductService } from './services/productService';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)},
  {
    path: 'productos',
    loadChildren: () => import('./routes/product.routes'),
    providers: [ProductService]
  },
  {
    path: 'admin',
    loadChildren: () => import('./routes/admin.routes'),
    providers: [ProductService]
  },
  {path: '**', loadComponent: () => import('./pages/notFound/notFound.component').then(mod => mod.NotFoundComponent)}
];

import { Routes } from '@angular/router';
import { ProductService } from './services/productService';
import { CategoryService } from './services/categoryService';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent),
    title: 'KrBijouterie - Home',
    providers: [CategoryService]
  },
  {
    path: 'productos',
    loadChildren: () => import('./routes/product.routes'),
    providers: [ProductService]
  },
  {
    path: 'admin',
    loadChildren: () => import('./routes/admin.routes'),
    title: 'KrBijouterie - Admin',
    providers: [ProductService, CategoryService]
  },
  {path: '**', loadComponent: () => import('./pages/notFound/notFound.component').then(mod => mod.NotFoundComponent)}
];

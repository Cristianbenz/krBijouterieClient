import { Routes } from '@angular/router';
import { ProductService } from './services/productService';
import { UserService } from './services/userService';
import { CategoryService } from './services/categoryService';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent)},
  {
    path: 'productos',
    loadChildren: () => import('./routes/product.routes'),
    providers: [ProductService, UserService]
  },
  {
    path: 'admin',
    loadChildren: () => import('./routes/admin.routes'),
    providers: [ProductService, UserService, CategoryService]
  },
  {path: '**', loadComponent: () => import('./pages/notFound/notFound.component').then(mod => mod.NotFoundComponent)}
];

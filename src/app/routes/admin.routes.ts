import { Route } from "@angular/router";
import { inject } from '@angular/core';
import { AdminCategoriesComponent } from "../pages/adminCategories/adminCategories.component";
import { AdminProductsComponent } from "../pages/adminProducts/adminProducts.component";
import { AdminComponent } from "../pages/admin/admin.component";
import { AuthGuard } from "../security/authGuard";

export default [
  {path: '', component: AdminComponent, children: [
      {path: 'categories', component: AdminCategoriesComponent, canActivate: [() => inject(AuthGuard).canActivate()]},
      {path: 'products', component: AdminProductsComponent, canActivate: [() => inject(AuthGuard).canActivate()]}
    ],
    providers: [AuthGuard],
  },
] as Route[]
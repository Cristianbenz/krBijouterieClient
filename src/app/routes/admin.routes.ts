import { Route } from "@angular/router";
import { AdminCategoriesComponent } from "../pages/adminCategories/adminCategories.component";
import { AdminProductsComponent } from "../pages/adminProducts/adminProducts.component";
import { AdminComponent } from "../pages/admin/admin.component";

export default [
  {path: '', component: AdminComponent, children: [
    {path: 'categories', component: AdminCategoriesComponent},
    {path: 'products', component: AdminProductsComponent}
  ]},
] as Route[]
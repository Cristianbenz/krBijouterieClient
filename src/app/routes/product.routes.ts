import { ProductsComponent } from "../pages/products/products.component";
import { DetailComponent } from "../pages/detail/detail.component";
import { Route } from "@angular/router";


export default [
  {path: 'detail/:id', component: DetailComponent},
  {path: ':category', component: ProductsComponent},
] as Route[];
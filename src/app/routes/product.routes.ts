import { ProductsComponent } from "../pages/products/products.component";
import { DetailComponent } from "../pages/detail/detail.component";
import { Route } from "@angular/router";


export default [
  {path: ':section/detalle/:id', component: DetailComponent, title: 'KrBijouterie - Detalle'},
  {path: ':category', component: ProductsComponent, title: 'KrBijouterie - Productos'},
] as Route[];
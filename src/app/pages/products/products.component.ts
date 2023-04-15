import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiltersNavComponent } from "src/app/components/filtersNav/filtersNav.component";
import { ProductCardComponent } from "src/app/components/productCard/productCard.component";

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, FiltersNavComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public products = [
    {
      id: 1,
      picture: 'https://i.pinimg.com/564x/34/05/36/34053690587528f81c54f0a8106d671f.jpg',
      name: 'Caravana re buena',
      price: 150
    }
  ]
}
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FiltersNavComponent } from "src/app/components/filtersNav/filtersNav.component";
import { ProductCardComponent } from "src/app/components/productCard/productCard.component";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/services/productService";

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FiltersNavComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private _category! : string;
  public products = [
    {
      id: 1,
      picture: 'https://i.pinimg.com/564x/34/05/36/34053690587528f81c54f0a8106d671f.jpg',
      name: 'Caravana re buena',
      price: 150
    }
  ]

  constructor(private _route: ActivatedRoute, private _productService : ProductService) {
    
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._category = params['category'];
    });
    this._productService.getAll({category: this._category, getDisabled: false})
    .subscribe({
      next: response => {
        if(response.success) {
          this.products = response.data;
        }
      },
      error: error => console.log(error)
    })
  }
}
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { FiltersNavComponent } from "src/app/components/filtersNav/filtersNav.component";
import { ProductCardComponent } from "src/app/components/productCard/productCard.component";
import { ProductService } from "src/app/services/productService";
import { IProduct } from "src/app/models/product";

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FiltersNavComponent, ProductCardComponent, MatMenuModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public category! : string;
  public products: Array<IProduct> = []
  private _initFilter = window.sessionStorage.getItem('filters')
  constructor(private _route: ActivatedRoute, private _productService : ProductService) {}

  ngOnInit(): void {
    const savedFilters = this._initFilter ? JSON.parse(String(this._initFilter)) : null
    this._route.params.subscribe(params => {
      this.category = params['category'];
    });
    this._productService.getAll(savedFilters || {category: this.category, getDisabled: false})
    .subscribe({
      next: response => {
        if(response.success) {
          this.products = response.data;
        }
      },
      error: error => console.log(error)
    })
  }

  filterProducts(filters: any) {
    this._productService.getAll({getDisabled: false, category: this.category, ...filters})
    .subscribe({
      next: response => {
        if(response.success) {
          this.products = response.data
        }
      },
      error: () => {
        this.products = []
      }
    })
  }
}
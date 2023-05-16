import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { FiltersNavComponent } from "src/app/components/filtersNav/filtersNav.component";
import { ProductCardComponent } from "src/app/components/productCard/productCard.component";
import { ProductService } from "src/app/services/productService";
import { IProduct } from "src/app/models/product";
import { LoaderComponent } from "src/app/components/loader/loader.component";

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FiltersNavComponent, ProductCardComponent, MatMenuModule, LoaderComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public loading: boolean = true;
  public category : string = '';
  public name : string = '';
  public products: Array<IProduct> = []
  private _initFilter = window.sessionStorage.getItem('filters')
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService : ProductService
  ) {}

  ngOnInit(): void {
    const savedFilters = this._initFilter ? JSON.parse(String(this._initFilter)) : null
    const categoryFromParams = this._route.snapshot.paramMap.get('category');
    const nameFromParams = this._route.snapshot.paramMap.get('name') || '';
    this.category = String(categoryFromParams)
    this.name = String(nameFromParams)

    this._productService.getAll(savedFilters? {...savedFilters, category: categoryFromParams, getDisabled: false, name: nameFromParams} : {category: categoryFromParams, getDisabled: false, name: nameFromParams})
    .subscribe({
      next: response => {
        if(response.success) {
          this.products = response.data;
        }
        this.finishLoading()
      },
      error: error => {
        if(error.status === 404) {
          this.finishLoading()
        }
      }
    })
  }

  filterProducts(filters: any) {
    this.loading = true
    this.name && this._router.navigate(['productos/todo'])
    this._productService.getAll({getDisabled: false, category: this.category, ...filters})
    .subscribe({
      next: response => {
        if(response.success) {
          this.products = response.data
        }
        this.finishLoading()
      },
      error: (error) => {
        if(error.status === 404) {
          this.products = []
          this.finishLoading()
        }
      }
    })
  }

  finishLoading() {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
}
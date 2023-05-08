import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";

import { ProductActionsComponent } from "src/app/components/productActions/productActions.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ProductFormComponent } from "src/app/components/productForm/productForm.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ProductService } from "src/app/services/productService";
import { IProduct } from "src/app/models/product";

@Component({
  standalone: true,
  selector: 'app-admin-products',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, ProductActionsComponent, MatButtonModule, MatIconModule, MatDialogModule, CommonModule],
  templateUrl: './adminProducts.component.html',
  styleUrls: ['./adminProducts.component.scss']
})
export class AdminProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  public productsList: MatTableDataSource<IProduct> = new MatTableDataSource<IProduct>();
  displayedColumns: string[] = ['name', 'category', 'status', 'price', 'actions'];
  private productForm = this._formBuilder.group({
    product: this._formBuilder.group({
      name: ['', Validators.required],
      pictures: [[], Validators.required],
      categoryId: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    }),
    addedImages: [[], Validators.required]
  })
  
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialog,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.productsList.paginator = this.paginator;
  }

  getProducts() {
    this._productService.getAll({getDisabled: true})
    .subscribe({
      next: response => {
        if(response.success) {
          this.productsList = new MatTableDataSource<IProduct>(response.data);
        }
      }
    })
  }

  openAddProductForm() {
    this._dialogRef.open(ProductFormComponent, {
      data: {
        productForm: this.productForm,
        action: this.uploadProduct.bind(this)
      }
    })
  }

  uploadProduct() {
    this._productService.add({...this.productForm.controls.product.value, addedImages: this.productForm.controls.addedImages.value})
    .subscribe({
      next: response => {
        if(response.success) {
          this._dialogRef.closeAll()
        }
      },
      error: error => {
        if(error) {
          console.log('Falta informacion', error)
        }
      }
    })
  }
}
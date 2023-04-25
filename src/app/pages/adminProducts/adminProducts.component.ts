import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";

import { ProductActionsComponent } from "src/app/components/productActions/productActions.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ProductFormComponent } from "src/app/components/productForm/productForm.component";
import { FormBuilder, Validators } from "@angular/forms";
import { ProductService } from "src/app/services/productService";

@Component({
  standalone: true,
  selector: 'app-admin-products',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, ProductActionsComponent, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './adminProducts.component.html',
  styleUrls: ['./adminProducts.component.scss']
})
export class AdminProductsComponent implements AfterViewInit {
  private _products = [
    {
      id: 10,
      name: 'Un collar',
      category: 'Collares',
      status: 'Visible',
      price: 120,
    }
  ]
  displayedColumns: string[] = ['name', 'category', 'status', 'price', 'actions'];
  dataSource = new MatTableDataSource(this._products);
  private productForm = this._formBuilder.group({
    product: this._formBuilder.group({
      name: ['', Validators.required],
      pictures: [[], Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    }),
    files: [new FormData(), Validators.required]
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialog,
    public _productService: ProductService
  ) {}
  
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    this._productService.add(this.productForm.value)
    .subscribe({
      error: error => {
        if(error) {
          console.log('Falta informacion', error)
        }
      }
    })
  }
}
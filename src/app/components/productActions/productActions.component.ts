import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { ProductFormComponent } from '../productForm/productForm.component';
import { IProduct } from 'src/app/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'product-actions',
  imports: [MatDialogModule, MatMenuModule, MatButtonModule],
  templateUrl: './productActions.component.html',
  styleUrls: ['./productActions.component.scss']
})
export class ProductActionsComponent implements OnInit {
  @Input() product!: IProduct;
  public productForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      id: [this.product.id, Validators.required],
      name: [this.product.name, Validators.required],
      pictures: [this.product.pictures, Validators.required],
      price: [this.product.price, Validators.required],
      description: [this.product.description, Validators.required]
    })
  }

  openProductForm() {
    this._dialogRef.open(ProductFormComponent, {
      data: {
        product: this.product,
        productForm: this.productForm,
        action: this.updateProduct
      }
    })
  }

  updateProduct() {
    console.log(this.productForm.value)
  }
}
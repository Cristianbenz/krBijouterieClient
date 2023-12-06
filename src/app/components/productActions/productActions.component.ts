import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ProductFormComponent } from '../productForm/productForm.component';
import { IProduct } from 'src/app/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/productService';

@Component({
  standalone: true,
  selector: 'product-actions',
  imports: [CommonModule, MatDialogModule, MatMenuModule, MatButtonModule],
  templateUrl: './productActions.component.html',
  styleUrls: ['./productActions.component.scss'],
})
export class ProductActionsComponent implements OnInit {
  @Input() product!: IProduct;
  @Output() updateEvent = new EventEmitter();
  public productForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialog,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      id: [this.product.id, Validators.required],
      name: [this.product.name, Validators.required],
      pictures: [this.product.pictures, Validators.required],
      categoryName: [this.product.category.name, Validators.required],
      price: [this.product.price, Validators.required],
      description: [this.product.description, Validators.required],
      enabled: this.product.enabled,
    });
  }

  openProductForm() {
    this._dialogRef.open(ProductFormComponent, {
      data: {
        product: this.product,
        productForm: this.productForm,
        action: this.updateProduct.bind(this),
      },
    });
  }

  updateProduct() {
    const product = this.productForm.value;
    this._productService.update(product).subscribe({
      next: (response) => {
        this._dialogRef.closeAll();
        if (response.success) this.updateEvent.emit();
      },
    });
  }

  disable() {
    this._productService.delete(this.product.id).subscribe({
      next: (response) => {
        if (response.success) {
          this.updateEvent.emit();
        }
      },
    });
  }

  enable() {
    this.productForm.get(['product', 'enabled'])?.setValue(true);
    this.updateProduct();
  }
}

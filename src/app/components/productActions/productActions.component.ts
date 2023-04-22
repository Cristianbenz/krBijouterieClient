import { Component, Input } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button';
import { ProductFormComponent } from '../productForm/productForm.component';
import { IProduct } from 'src/app/models/product';

@Component({
  standalone: true,
  selector: 'product-actions',
  imports: [MatDialogModule, MatMenuModule, MatButtonModule],
  templateUrl: './productActions.component.html',
  styleUrls: ['./productActions.component.scss']
})
export class ProductActionsComponent {
  @Input() product!: IProduct;
  constructor(
    private _dialogRef: MatDialog
  ) {}

  openProductForm() {
    this._dialogRef.open(ProductFormComponent, {
      data: this.product
    })
  }
}
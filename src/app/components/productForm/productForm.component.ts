import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { IProduct } from "src/app/models/product";

@Component({
  standalone: true,
  selector: 'product-form',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.scss']
})
export class ProductFormComponent {
  public data: IProduct = inject(MAT_DIALOG_DATA);
  public productForm = this._formBuilder.group({
    id: [this.data.id, Validators.required],
    name: [this.data.name, Validators.required],
    pictures: [this.data.pictures, Validators.required],
    price: [this.data.price, Validators.required],
    description: [this.data.description, Validators.required]
  })

  constructor(
    private _dialog : MatDialogRef<ProductFormComponent>,
    private _formBuilder: FormBuilder
  ) { }

  close() {
    this._dialog.close();
  }

  sendForm() {
    console.log(this.productForm.value)
  }
}
import { Component, Input, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { IProduct } from "src/app/models/product";
import { IPicture } from "src/app/models/picture";

@Component({
  standalone: true,
  selector: 'product-form',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.scss']
})
export class ProductFormComponent {
  public data: {product?: IProduct; productForm: FormGroup; action: Function} = inject(MAT_DIALOG_DATA);
  public images: Array<URL> = [];
  constructor(
    private _dialog : MatDialogRef<ProductFormComponent>,
  ) {
    const getControl = this.data.productForm.get(['files'])?.value as FormData;
    getControl.forEach(value => {
      const reader = new FileReader();
      reader.readAsDataURL(value.valueOf() as Blob);
      reader.onload = () => {
        this.images.push(new URL(reader.result as string));
      };
    })
    this._dialog.afterClosed().subscribe(() => this.data.productForm.reset({
      product: {
        name: '',
        pictures: [],
        price: '',
        description: ''
      },
      files : new FormData()
    }))
  }

  close() {
    this._dialog.close();
  }

  onImageChange(evt: any) {
    const files = evt.files;
    const picturesArray = this.data.productForm.get(['product', 'pictures'])?.value;
    const filesArray = this.data.productForm.get(['files'])?.value as FormData;
    if(files) {
      const urls: Array<URL> = [];
      for(let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          picturesArray.push(files[i].name);
          filesArray.append('image', files[i]);
          urls.push(new URL(reader.result as string))
          this.images = urls;
        };
      }
    }
  }
}
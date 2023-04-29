import { Component, Input, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { IProduct } from "src/app/models/product";
import { CategoryService } from "src/app/services/categoryService";
import { ICategory } from "src/app/models/category";

@Component({
  standalone: true,
  selector: 'product-form',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.scss']
})
export class ProductFormComponent implements OnInit {
  public data: {product?: IProduct; productForm: FormGroup; action: Function} = inject(MAT_DIALOG_DATA);
  public categories: Array<ICategory> = [];
  public images: Array<string> = [];
  constructor(
    private _dialog : MatDialogRef<ProductFormComponent>,
    private _categoryService: CategoryService
  ) {
    this.data.product?.pictures.forEach(OPicture => {
      OPicture.src && this.images.push(OPicture.src)
    })
    this._dialog.afterClosed().subscribe(() => this.data.productForm.reset({
      product: {
        id: this.data.product?.id || null,
        name: this.data.product?.name || '',
        pictures: this.data.product?.pictures || [],
        categoryId: this.data.product?.category.id || '',
        price: this.data.product?.price || '',
        description: this.data.product?.description || '',
        enabled: this.data.product?.enabled || true
      },
      files : new FormData()
    }))
  }

  ngOnInit(): void {
    this._categoryService.getAll()
    .subscribe(response => {
      if(response.success && response.data.length) {
        this.categories = response.data
      }
    })
  }

  close() {
    this._dialog.close();
  }

  onImageChange(evt: any) {
    const files = evt.target.files;
    const picturesArray = this.data.productForm.get(['product', 'pictures']);
    const filesArray = this.data.productForm.get(['files'])?.value;
    picturesArray?.reset(this.data.product?.pictures || []);
    filesArray.delete('image');
    if(files.length) {
      const reader = new FileReader();
      for(let i = 0; i < files.length; i++) {
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          picturesArray?.value.push({
            name: files[i].name,
            src: String()
          })
          filesArray.append('image', files[i]);
          this.images.push(reader.result as string)
        };
      }
    }
  }
}
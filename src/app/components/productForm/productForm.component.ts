import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup, FormsModule} from "@angular/forms";
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
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.scss']
})
export class ProductFormComponent implements OnInit {
  public data: {product?: IProduct; productForm: FormGroup; action: Function} = inject(MAT_DIALOG_DATA);
  public categories: Array<ICategory> = [];
  public images: Array<string> = [];
  public imageInput: string = '';
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
      addedImages: []
    }))
  }

  ngOnInit(): void {
    this._categoryService.getAll(false)
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
    const value = evt.target.value;
    this.imageInput = value;
  }

  addImage() {
    this.images.push(this.imageInput);
    this.data.productForm.controls['addedImages'].value.push(this.imageInput);
    this.imageInput = ''
  }
}
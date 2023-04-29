import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { ICategory } from "src/app/models/category";

@Component({
  standalone: true,
  selector: 'product-form',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './categoryForm.component.html',
  styleUrls: ['./categoryForm.component.scss']
})
export class CategoryFormComponent{
  public data: {category?: ICategory; categoryForm: FormGroup; action: Function} = inject(MAT_DIALOG_DATA);
  constructor(
    private _dialog : MatDialogRef<CategoryFormComponent>
  ) {
    this._dialog.afterClosed()
    .subscribe(() => this.data.categoryForm.reset({
      id: 0,
      name: this.data.category?.name || '',
      }))
  }

  close() {
    this._dialog.close();
  }
}
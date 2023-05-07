import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ICategory } from "src/app/models/category";
import { CategoryService } from "src/app/services/categoryService";
import { FormBuilder, Validators } from "@angular/forms";
import { CategoryFormComponent } from "src/app/components/categoryForm/categoryForm.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

@Component({
  standalone: true,
  selector: 'app-admin-categories',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatMenuModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './adminCategories.component.html',
  styleUrls: ['./adminCategories.component.scss']
})
export class AdminCategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  displayedColumns: string[] = ['name', 'status', 'actions'];
  public categoriesList: MatTableDataSource<ICategory> = new MatTableDataSource<ICategory>();
  private categoryForm = this._formBuilder.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      enabled: [true, Validators.required]
  })
  
  constructor(
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories()
  }

  ngAfterViewInit() {
    this.categoriesList.paginator = this.paginator;
  }

  getCategories() {
    this._categoryService.getAll(true)
    .subscribe({
      next: response => {
        if(response.success) {
          this.categoriesList = new MatTableDataSource<ICategory>(response.data);
        }
      }
    })
  }

  openAddCategoryForm() {
    this._dialogRef.open(CategoryFormComponent, {
      data: {
        categoryForm: this.categoryForm,
        action: this.addCategory.bind(this)
      }
    })
  }

  openUpdateCategoryForm(category: ICategory) {
    this.categoryForm.reset({
      id: category.id,
      name: category.name
    })
    this._dialogRef.open(CategoryFormComponent, {
      data: {
        categoryForm: this.categoryForm,
        action: this.updateCategory.bind(this)
      }
    })
  }

  addCategory() {
    this._categoryService.add(this.categoryForm.controls.name.value)
    .subscribe({
      next: response => {
        if(response.success) {
          this.getCategories()
          this._dialogRef.closeAll()
        }
      }
    })
  }

  updateCategory() {
    this._categoryService.update(this.categoryForm.value)
    .subscribe({
      next: response => {
        if(response.success) {
          this.getCategories()
          this._dialogRef.closeAll()
        }
      }
    })
  }

  disable(categoryId: number) {
    this._categoryService.delete(categoryId)
    .subscribe({
      next: response => {
        if(response.success) {
          this.getCategories()
        }
      }
    })
  }

  enable(category: ICategory) {
    this.categoryForm.reset({
      id: category.id,
      name: category.name,
      enabled: true
    })
    this.updateCategory()
  }
}
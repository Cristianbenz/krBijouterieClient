import { Component, ViewChild } from "@angular/core";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";

@Component({
  standalone: true,
  selector: 'app-admin-categories',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './adminCategories.component.html',
  styleUrls: ['./adminCategories.component.scss']
})
export class AdminCategoriesComponent {
  private _categories = [
    {
      name: 'Collares',
      picture: '',
      status: 'Visible'
    },
    {
      name: 'Pulseras',
      picture: '',
      status: 'Visible'
    },
    {
      name: 'Anillos',
      picture: '',
      status: 'Visible'
    }
  ]
  displayedColumns: string[] = ['name', 'status', 'actions'];
  dataSource = new MatTableDataSource(this._categories);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
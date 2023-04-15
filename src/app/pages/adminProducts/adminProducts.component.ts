import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";

@Component({
  standalone: true,
  selector: 'app-admin-products',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './adminProducts.component.html',
  styleUrls: ['./adminProducts.component.scss']
})
export class AdminProductsComponent implements AfterViewInit {
  private _products = [
    {
      name: 'Un collar',
      category: 'Collares',
      status: 'Visible',
      price: 120,
    }
  ]
  displayedColumns: string[] = ['name', 'category', 'status', 'price', 'actions'];
  dataSource = new MatTableDataSource(this._products);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
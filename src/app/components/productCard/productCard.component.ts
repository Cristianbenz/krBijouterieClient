import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { IProduct } from "src/app/models/product";

@Component({
  standalone: true,
  selector: 'product-card',
  imports: [RouterModule, MatCardModule],
  templateUrl: './productCard.component.html',
  styleUrls: ['./productCard.component.scss']
})
export class ProductCardComponent {
  @Input() product! : IProduct
}
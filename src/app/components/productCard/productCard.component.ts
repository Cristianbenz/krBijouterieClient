import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
  standalone: true,
  selector: 'product-card',
  imports: [MatCardModule],
  templateUrl: './productCard.component.html',
  styleUrls: ['./productCard.component.scss']
})
export class ProductCardComponent {
  @Input() product! : {id: number; name: string; picture: string; price: number}
}
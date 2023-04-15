import { Component, Input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'

@Component({
  standalone: true,
  selector: 'category-card',
  imports: [MatCardModule],
  templateUrl: './categoryCard.component.html',
  styleUrls: ['./categoryCard.component.scss']
})
export class CardComponent {
  @Input() data!: {picture: string, name: string}
}
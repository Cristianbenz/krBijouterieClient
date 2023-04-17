import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  standalone: true,
  selector: 'filters-nav',
  imports: [MatSliderModule],
  templateUrl: './filtersNav.component.html',
  styleUrls: ['./filtersNav.component.scss'],
})
export class FiltersNavComponent {
  
}
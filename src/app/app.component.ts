import { Component } from '@angular/core';

import { NavBarComponent } from './components/navBar/navBar.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jewelryEcommerceClient';
}

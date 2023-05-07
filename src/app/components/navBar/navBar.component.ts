import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-navBar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.scss']
})
export class NavBarComponent {
}
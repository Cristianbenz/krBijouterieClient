import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { CardComponent } from "../../components/categoryCard/categoryCard.component";
import { ContactComponent } from "src/app/components/contact/contact.component";

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CardComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public categories = [
    {
      picture: 'https://i.pinimg.com/originals/87/95/c6/8795c60c3b49d96d511542f9cf841274.jpg',
      name: 'Collares'
    },
    {
      picture: 'https://i.pinimg.com/564x/13/10/66/1310668be1945efc128a8f0cddf4c8df.jpg',
      name: 'Caravanas'
    },
    {
      picture: 'https://i.pinimg.com/736x/99/1e/f8/991ef8c49a37e08f1994f625e66384e1.jpg',
      name: 'Pulseras'
    }
  ]
}
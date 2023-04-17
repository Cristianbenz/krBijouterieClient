import { Component, OnInit } from "@angular/core";
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CarouselComponent } from "src/app/components/carousel/carousel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

import { BackArrowComponent } from "src/app/components/backArrow/backArrow.component";

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [RouterModule, CarouselComponent, FontAwesomeModule, BackArrowComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public backArrow = faArrowAltCircleLeft;
  private _productId!: string;
  public product: {name: string; pictures: Array<string>; description: string; price: number} = {
    name: 'Unas caravanitas',
    pictures: ['http://orix.com.uy/web/wp-content/uploads/2022/12/68-5-600x600.jpg', 'http://orix.com.uy/web/wp-content/uploads/2022/12/58-2.jpg'],
    description: 'Mira caravanas',
    price: 150
  };

    constructor(private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this._route.params.subscribe(params => {
            this._productId = params['id'];
          });
    }

  
}
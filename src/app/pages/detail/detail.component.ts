import { Component, OnInit } from "@angular/core";
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import { CarouselComponent } from "src/app/components/carousel/carousel.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";

import { BackArrowComponent } from "src/app/components/backArrow/backArrow.component";
import { IProduct } from "src/app/models/product";
import { ProductService } from "src/app/services/productService";

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [RouterModule, CommonModule, CarouselComponent, FontAwesomeModule, BackArrowComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public backArrow = faArrowAltCircleLeft;
  private _productId!: number;
  public product!: IProduct;
  public location = window.location;
  public text = 'Hola me interesa este producto: ';

    constructor(
      private _route: ActivatedRoute,
      private _productService: ProductService
    ) {}

    ngOnInit(): void {
        this._route.params.subscribe(params => {
            this._productId = params['id'];
        });
        this._productService.getById(this._productId)
        .subscribe({
          next: response => {
            if(response.success) {
              this.product = response.data
            }
          }
        })
    }


}
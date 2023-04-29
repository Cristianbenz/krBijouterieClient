import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { IPicture } from 'src/app/models/picture';

@Component({
  standalone: true,
  selector: 'carousel',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() pictures: Array<IPicture> = [];
  public items: Array<{ id: number; picture: string; marginLeft?: number }> = [];
  public currentPosition: number = 0;
  public arrowLeft = faArrowAltCircleLeft;
  public arrowRight = faArrowAltCircleRight;

  ngOnInit() {
    let index = 0;
    for(let picture of this.pictures) {
      this.items.push({
        id: index,
        picture: picture.src,
        marginLeft: 0
      });
      index ++;

  }
  }

  setCurrent(position: number) {
    this.currentPosition = position;
    const firstItem = this.items.find((item) => item.id === 0);
    if (firstItem) firstItem.marginLeft = -100 * position;
  }

  next() {
    let margin = 0;
    let nextPosition = this.currentPosition + 1;

    if (nextPosition <= this.items.length - 1) {
      margin = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }

    const firstItem = this.items.find((item) => item.id === 0);
    if (firstItem) firstItem.marginLeft = margin;
    this.currentPosition = nextPosition;
  }

  prev() {
    let margin = 0;
    let nextPosition = this.currentPosition - 1;

    if (nextPosition >= 0) {
      margin = -100 * nextPosition;
    } else {
      nextPosition = this.items.length - 1;
      margin = -100 * nextPosition;
    }

    const firstItem = this.items.find((item) => item.id === 0);
    if (firstItem) firstItem.marginLeft = margin;
    this.currentPosition = nextPosition;
  }
}

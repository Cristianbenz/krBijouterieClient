import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareCaretLeft } from '@fortawesome/free-regular-svg-icons';
@Component({
    standalone: true,
    selector: 'back-arrow',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: 'backArrow.component.html',
    styleUrls: ['./backArrow.component.scss']
})
export class BackArrowComponent {
    public backArrow = faSquareCaretLeft;

    constructor(private _location: Location) {}

    back() {
        this._location.back()
    }
}
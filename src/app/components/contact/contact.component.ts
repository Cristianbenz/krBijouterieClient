import { Component } from "@angular/core";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faInstagram, faWhatsapp  } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { GoogleMapComponent } from "../map/googleMap.component";
import { ContactFormComponent } from "../contactForm/contactForm.component";

@Component({
  standalone: true,
  selector: 'contact',
  imports: [GoogleMapComponent, MatDialogModule, MatIconModule, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public faInstagram = faInstagram
  public faWhatsapp = faWhatsapp
  public faEnvelope = faEnvelope
  constructor(
    private _dialogRef: MatDialog
  ) {}
  openForm() {
    this._dialogRef.open(ContactFormComponent)
  }
}
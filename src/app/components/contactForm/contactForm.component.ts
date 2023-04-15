import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators, } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog"
import { MatInputModule } from "@angular/material/input";

@Component({
  standalone: true,
  selector: 'contact-form',
  imports: [ReactiveFormsModule, MatDialogModule, MatInputModule],
  templateUrl: './contactForm.component.html',
  styleUrls: ['./contactForm.component.scss']
})
export class ContactFormComponent {
  public form = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: [''],
    phone: ['', [Validators.minLength(8), Validators.maxLength(9)]],
    text: ['', [Validators.required, Validators.minLength(10)]],
  })
  constructor(
    _dialogRef: MatDialogRef<ContactFormComponent>,
    private _formBuilder: FormBuilder
  ) {}

  submit() {

  }
}
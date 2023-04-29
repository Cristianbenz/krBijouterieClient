import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/services/userService';
import { IUser } from 'src/app/models/user';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [RouterModule, MatListModule, MatIconModule, CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent{
  public user : IUser | null = null;
  public authForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder
  ) {
    this._userService.user.subscribe(data => this.user = data);
  }

  authenticate() {
    this._userService.authenticate(this.authForm.value)
    .subscribe();
  }

  signOut() {
    this._userService.signOut()
  }
}
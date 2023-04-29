import { Router } from "@angular/router";
import { UserService } from "../services/userService";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard {
  constructor(
      private _router: Router,
      private _userService: UserService
  ) { }

  canActivate() {
      if (this._userService.userData) return true;
      this._router.navigate(['admin']);
      return false;
  }
}
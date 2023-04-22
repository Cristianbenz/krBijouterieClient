import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { UserService } from "../services/userService";

export class AuthGuard implements CanActivate {
  constructor(
      private _router: Router,
      private _userService: UserService
  ) { }

  canActivate() {
      if (this._userService.userData) return true;
      
      this._router.navigate(['']);
      return false;
  }
}
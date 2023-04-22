import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/user";
import { UserService } from "../services/userService";

export class JwtInterceptor implements HttpInterceptor {
  private _user : IUser | null = null;

  constructor(private _userService: UserService) {
    this._userService.user.subscribe(data => this._user = data);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    if(this._user) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this._user.token}`
            }
        });
    }
    return next.handle(req);
}
}
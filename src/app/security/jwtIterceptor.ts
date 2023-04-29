import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/user";
import { UserService } from "../services/userService";
import { Injectable } from "@angular/core";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _user : IUser | null = null;

  constructor(private _userService: UserService) {
    this._userService.user.subscribe(data => this._user = data);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImVsYWRtaW5AZ21haWwuY29tIiwibmJmIjoxNjgyNjM1Nzg1LCJleHAiOjE2ODMyNDA1ODUsImlhdCI6MTY4MjYzNTc4NX0.mq6KCszQwDZbkVBSLSvjBxdo9zUd6Pot5V3JF8yCezA"
      }
    });
    // request.headers.append("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImVsYWRtaW5AZ21haWwuY29tIiwibmJmIjoxNjgyNjM1Nzg1LCJleHAiOjE2ODMyNDA1ODUsImlhdCI6MTY4MjYzNTc4NX0.mq6KCszQwDZbkVBSLSvjBxdo9zUd6Pot5V3JF8yCezA")
    return next.handle(request);
  }
}
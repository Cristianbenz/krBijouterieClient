import { inject } from "@angular/core";
import { UserService } from "../services/userService";
import { HttpInterceptorFn } from "@angular/common/http";

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);

  userService.user.subscribe(data => {
    console.log(data)
    if(data) {
      req = req.clone({
        setHeaders: {
          "Authorization": "Bearer " + data.token
        }
      })
    }
  })

  return next(req)
}
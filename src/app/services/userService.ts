import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { IUser } from "../models/user";
import { environment } from "src/environments/environment";
import { IResponse } from "../models/response";
import { AuthResponse } from "../models/authResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _url = environment.apiAuthUrl;
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  private _userSubject: BehaviorSubject<IUser | null>;
  public user : Observable<IUser | null>;

  constructor(
    private _http: HttpClient
  ) {
    const initUserValue = window.localStorage.getItem('user')
    const USER = initUserValue ? JSON.parse(initUserValue) : null;
    this._userSubject = new BehaviorSubject<IUser | null>(USER);
    this.user = this._userSubject.asObservable();
  }

  public get userData() {
    return this._userSubject.value;
  }

  signUp() {

  }

  authenticate(credentials: any): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._url}/login`, credentials, this._httpOptions)
    .pipe(
      map(request => {
        if(request.token) {
          const nUser = {name: "admin", token: request.token}
          this._userSubject.next(nUser);
          window.localStorage.setItem('user', JSON.stringify(nUser));
        }
        return request;
      })
    )
  }

  signOut() {
    window.localStorage.removeItem('user');
    this._userSubject.next(null)
  }
}
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../models/user";

export class UserService {
  private _userSubject: BehaviorSubject<IUser | null>;
  public user : Observable<IUser | null>;

  constructor() {
    const USER = JSON.parse(String(window.localStorage.getItem('user')));
    this._userSubject = new BehaviorSubject<IUser | null>(USER);
    this.user = this._userSubject.asObservable();
  }

  public get userData() {
    return this._userSubject.value;
  }

  signUp() {

  }

  authenticate() {
    
  }

  signOut() {
    
  }
}
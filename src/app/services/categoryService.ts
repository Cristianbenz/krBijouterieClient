import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IResponse } from "../models/response";
import { Observable } from "rxjs";
import { ICategory } from "../models/category";
import { UserService } from "./userService";
import { IUser } from "../models/user";

@Injectable()
export class CategoryService {
  private readonly _url = environment.apiUrl + "/Category";
  private _user: IUser | null = null
  private _httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  constructor(
    private _http : HttpClient,
    private _userSrevice: UserService
  ) {
    this._userSrevice.user.subscribe(info => this._user = info)
  }

  getAll(disabled: boolean): Observable<IResponse> {
    return this._http.get<IResponse>(`${this._url}?getDisabled=${disabled}`)
  }

  add(category: any): Observable<IResponse> {
    const optionsWithAuth = {
      headers: {
        ...this._httpOptions.headers,
        "Authorization": "Bearer " + this._user?.token
      }
    }
    return this._http.post<IResponse>(`${this._url}`, {name: category}, optionsWithAuth)
  }

  update(category: any): Observable<IResponse> {
    const optionsWithAuth = {
      headers: {
        ...this._httpOptions.headers,
        "Authorization": "Bearer " + this._user?.token
      }
    }
    const {id, ...rest} = category as ICategory;
    return this._http.put<IResponse>(`${this._url}/${id}`, {...rest}, optionsWithAuth)
  }

  delete(categoryId: number): Observable<IResponse> {
    const optionsWithAuth = {
      headers: {
        ...this._httpOptions.headers,
        "Authorization": "Bearer " + this._user?.token
      }
    }
    return this._http.delete<IResponse>(`${this._url}/${categoryId}`, optionsWithAuth)
  }
}
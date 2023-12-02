import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IResponse } from "../models/response";
import { Observable } from "rxjs";
import { ICategory } from "../models/category";

@Injectable()
export class CategoryService {
  private readonly _url = environment.apiUrl + "/category";
  private _httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  constructor(
    private _http : HttpClient
  ) { }

  getAll(disabled: boolean): Observable<IResponse> {
    return this._http.get<IResponse>(`${this._url}?getDisabled=${disabled}`)
  }

  add(category: any): Observable<IResponse> {
    return this._http.post<IResponse>(`${this._url}`, {name: category}, this._httpOptions)
  }

  update(category: any): Observable<IResponse> {
    const {id, ...rest} = category as ICategory;
    return this._http.put<IResponse>(`${this._url}/${id}`, {...rest}, this._httpOptions)
  }

  delete(categoryId: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${this._url}/${categoryId}`, this._httpOptions)
  }
}
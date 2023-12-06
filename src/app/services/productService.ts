import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { IGetAllFilter } from "../models/getAllFilter";
import { IResponse } from "../models/response";
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'any'
})
export class ProductService {
  private readonly _url = environment.apiUrl + "/product";
  private _httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  constructor(
    private _http : HttpClient
    ) { }
  
  getAll(filters?: IGetAllFilter): Observable<IResponse> {
    let queryFilters = {};
    if(filters) {
      const {getDisabled, ...rest} = filters;
      queryFilters = {
        enabled: !getDisabled,
        ...rest
      }
    }
    return this._http.post<IResponse>(`${this._url}/all`, queryFilters, this._httpOptions)
  }

  getById(productId: number): Observable<IResponse> {
    return this._http.get<IResponse>(`${this._url}/${productId}`)
  }

  uploadImage(productId: number, files: any) {
    return this._http.post<IResponse>(`${this._url}/uploadImages/${productId}`, files);
  }

  deleteImage(productId: number, fileName: string) {
    return this._http.delete<IResponse>(`${this._url}/deleteImage/${productId}/${fileName}`);
  }

  add(product: any): Observable<IResponse> {
    return this._http.post<IResponse>(`${this._url}`, product, this._httpOptions);
  }
  
  update(product: any) {
    const {id, ...rest} = product as IProduct;
    return this._http.patch<IResponse>(`${this._url}/${id}`, {...rest}, this._httpOptions);
  }

  delete(productId: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${this._url}/${productId}`, this._httpOptions)
  }
}
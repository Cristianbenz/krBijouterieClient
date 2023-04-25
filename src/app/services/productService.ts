import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { IProduct } from "../models/product";
import { IGetAllFilter } from "../models/getAllFilter";
import { IResponse } from "../models/response";

@Injectable({
  providedIn: 'any'
})
export class ProductService {
  private readonly _url = environment.apiUrl + "/Products";
  private readonly _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private _http : HttpClient) {}
  
  getAll(filters: IGetAllFilter): Observable<IResponse> {
    const {name, category, minPrice, maxPrice, dateOrder, getDisabled} = {
      name: filters.name ? `name=${filters.name}` : '',
      category: filters.category ? `&category=${filters.category}` : '',
      minPrice: filters.minPrice ? `&minPrice=${filters.minPrice}`  : '',
      maxPrice: filters.maxPrice ? `&maxPrice=${filters.maxPrice}`  : '',
      dateOrder: filters.dateOrder ? `&dateOrder=${filters.dateOrder}` : '',
      getDisabled: filters.getDisabled ? `&getDisabled=${filters.getDisabled}`  : ''
    }
    const queryString = `${name}${category}${minPrice}${maxPrice}${dateOrder}${getDisabled}`
    return this._http.get<IResponse>(`${this._url}?${queryString}`)
  }

  add(product: any): Observable<IResponse> {
    console.log(product)
    return this._http.post<IResponse>(`${this._url}`, product, this._httpOptions);
  }
  
  update(product: IProduct) {
    return this._http.put<IResponse>(`${this._url}`, product, this._httpOptions);
  }
}
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
  private readonly _url = environment.apiUrl + "/Products";
  private _httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  constructor(
    private _http : HttpClient
    ) { }
  
  getAll(filters: IGetAllFilter): Observable<IResponse> {
    const {name, category, minPrice, maxPrice, dateOrder, getDisabled, priceOrder} = {
      name: filters.name ? `name=${filters.name}` : '',
      category: filters.category ? `&category=${filters.category}` : '',
      minPrice: filters.minPrice ? `&minPrice=${filters.minPrice}`  : '',
      maxPrice: filters.maxPrice ? `&maxPrice=${filters.maxPrice}`  : '',
      dateOrder: filters.dateOrder ? `&dateOrder=${filters.dateOrder}` : '',
      priceOrder: filters.priceOrder ? `&priceOrder=${filters.priceOrder}` : '',
      getDisabled: filters.getDisabled ? `&getDisabled=${filters.getDisabled}`  : ''
    }
    const queryString = `${name}${category}${minPrice}${maxPrice}${getDisabled}${dateOrder}${priceOrder}`
    return this._http.get<IResponse>(`${this._url}?${queryString}`)
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
    console.log(product)
    return this._http.post<IResponse>(`${this._url}`, product, this._httpOptions);
  }
  
  update(product: any) {
    const {id, ...rest} = product as IProduct;
    return this._http.put<IResponse>(`${this._url}/${id}`, {...rest}, this._httpOptions);
  }

  delete(productId: number): Observable<IResponse> {
    return this._http.delete<IResponse>(`${this._url}/${productId}`, this._httpOptions)
  }
}
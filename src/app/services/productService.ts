import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { IGetAllFilter } from "../models/getAllFilter";
import { IResponse } from "../models/response";
import { IProduct } from '../models/product';
import { UserService } from './userService';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'any'
})
export class ProductService {
  private readonly _url = environment.apiUrl + "/Products";
  private _user: IUser | null = null
  private _httpOptions = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  constructor(
    private _http : HttpClient,
    private _userSrevice: UserService
    ) {
      this._userSrevice.user.subscribe(info => this._user = info)
    }
  
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
    return this._http.post<IResponse>(`${this._url}/uploadImages/${productId}`, files, {
      headers: {
        'Authorization': `Bearer ${this._user?.token}`
      }
    });
  }

  deleteImage(productId: number, fileName: string) {
    const customOptions = {
      headers: {
        'Authorization': `Bearer ${this._user?.token}`
      }
    }
    return this._http.delete<IResponse>(`${this._url}/deleteImage/${productId}/${fileName}`, customOptions);
  }

  add(product: any): Observable<IResponse> {
    const optionsWithAuth = {
      headers: {
        ...this._httpOptions.headers,
        "Authorization": "Bearer " + this._user?.token
      }
    }
    return this._http.post<IResponse>(`${this._url}`, product, optionsWithAuth);
  }
  
  update(product: any) {
    const optionsWithAuth = {
      headers: {
        ...this._httpOptions.headers,
        "Authorization": "Bearer " + this._user?.token
      }
    }
    const {id, ...rest} = product as IProduct;
    return this._http.put<IResponse>(`${this._url}/${id}`, {...rest}, optionsWithAuth);
  }

  delete(productId: number): Observable<IResponse> {
    const optionsWithAuth = {
      headers: {
        ...this._httpOptions.headers,
        "Authorization": "Bearer " + this._user?.token
      }
    }
    return this._http.delete<IResponse>(`${this._url}/${productId}`, optionsWithAuth)
  }
}
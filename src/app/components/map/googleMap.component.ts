import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  standalone: true,
  selector: 'google-map-widget',
  imports: [CommonModule, GoogleMapsModule, HttpClientModule, HttpClientJsonpModule],
  templateUrl: './googleMap.component.html',
  styleUrls: ['./googleMap.component.scss']
})

export class GoogleMapComponent {
  @Input() size: {width: string, height: string} = {width: '400px', height: '400px'}
  apiLoaded: Observable<boolean>;
  private _latLng = {lat: -34.79327, lng: -54.92735}
  public options: google.maps.MapOptions = {
    center: this._latLng,
    zoom: 17,
  };

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition: google.maps.LatLngLiteral = this._latLng;

  constructor(httpCLient: HttpClient) {
    this.apiLoaded = httpCLient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAAM58N9NIHAvmIE0eIDycF4hmXGM5Cgos', 'callback')
        .pipe(
          map(() => true),
          catchError(() => {
            return of(false)
          }),
        );
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as leaflet from 'leaflet';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'map-widget',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  map: any;

  ngOnInit() {
    this.map = leaflet.map('map').setView([-34.7933, -54.9273], 16);

    leaflet.tileLayer(`https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${environment.mapKey}`, {
      maxZoom: 17
    }).addTo(this.map);

    leaflet.marker([-34.7933, -54.9273], {
      title: 'Kiosco Rodo'
    })
    .addTo(this.map)
    .bindPopup("Kiosco Rodo").openPopup();
  }
}
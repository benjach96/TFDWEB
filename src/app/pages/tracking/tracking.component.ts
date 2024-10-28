import { Component, effect, signal, ViewChild } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';


@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [MenuComponent,GoogleMapsModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss'
})
export class TrackingComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  centerMap = {
    lat: -12.091689, 
    lng: -77.011981
  }

  center: google.maps.LatLngLiteral = { lat: this.centerMap.lat, lng: this.centerMap.lng }; // Center of Switzerland
  zoom = 15;
  markers: BranchMapMarker[] = [];
  
  constructor() {
    
  }


  
}

export interface BranchMapMarker {
  branch: any;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  options: {
    animation: google.maps.Animation;
  };
  label: string;
  click?: () => void;
}
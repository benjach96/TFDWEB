import { Component, effect, signal, ViewChild } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { GoogleMapsModule, MapGeocoder, MapGeocoderResponse, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { DetalleDeOrdenDTO } from '../../model/detalleDeOrdenDTO';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [MenuComponent, GoogleMapsModule, CommonModule],
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

  codigoDeSeguimiento: string = '';
  isLoading = true;
  isNotFound = false;
  isError= false;
  orden: DetalleDeOrdenDTO | null = null;

  constructor(route: ActivatedRoute, private backend: BackendService, private geocoder: MapGeocoder) {
    this.codigoDeSeguimiento = route.snapshot.params['id'];
    this.loadOrden();
  }

  async loadOrden() {
    console.log('loading orden: ' + this.codigoDeSeguimiento);
    try {
      this.orden = await this.backend.ordenes.getOrdenPorCodigoDeSeguimiento(this.codigoDeSeguimiento);
      console.log(this.orden);

      if (this.orden === null) {
        this.isNotFound = true;
      }
      else {
        this.geocoder.geocode({
          address: this.orden?.direccionDeEntrega
        }).subscribe((result) => {
          console.log(result);
          if (result.status === google.maps.GeocoderStatus.OK) {
            this.center = {
              lat: result.results[0].geometry.location.lat(),
              lng: result.results[0].geometry.location.lng(),
            };
          };
        });        
      }
    }
    catch (error: any) {
      this.isError = true;
      console.log(error);
    }

    this.isLoading = false;
  }

  getNombreDelEstado(estado: string) {
    if (estado === 'P') {
      return 'En Fabricación';
    } else if (estado === 'E') {
      return 'Enviado';
    } else if (estado === 'C') {
      return 'Entregado';
    } else {
      return 'Desconocido';
    }
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
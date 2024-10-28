import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  //El CommonModule es para el NGfor, que esta en la hoja for
  imports: [MenuComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  listhistory = [
    {
      Numerodeseguimiento: 'A001',
      FechadeRegistro: '10/10/2024',
      FechaOrden: '09/10/2024',
      FechaEntrega: '15/10/2024',
      Estado: 'Entregado',
    },
    {
      Numerodeseguimiento: 'A002',
      FechadeRegistro: '15/10/2024',
      FechaOrden: '8/10/2024',
      FechaEntrega: '5/10/2024',
      Estado: 'En Proceso',
    },
    {
      Numerodeseguimiento: 'A002',
      FechadeRegistro: '15/10/2024',
      FechaOrden: '8/10/2024',
      FechaEntrega: '5/10/2024',
      Estado: 'En Fabricación',
    },
  ];
  //Se le pone number porque esta tipado y se debe definir la variable
  DeleteTrackingBD(i: number) {
    this.listhistory.splice(i, 1);
  }
}

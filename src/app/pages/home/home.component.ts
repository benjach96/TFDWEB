import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ResumenDeOrdenDTO } from '../../model/resumenDeOrdenDTO';
import { BackendService } from '../../services/backend.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  //El CommonModule es para el NGfor, que esta en la hoja for
  imports: [MenuComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isLoadingOrdenes = false;
  ordenes: ResumenDeOrdenDTO[] = [];

  codigoDeSeguimiento = new FormControl('', Validators.required);

  constructor(private backendService: BackendService, private router: Router) {
    this.loadOrdenes();
  }

  async loadOrdenes() {
    this.isLoadingOrdenes = true;
    this.backendService.ordenes.getOrdenes().then(ordenes => {
      this.ordenes = ordenes;
      this.isLoadingOrdenes = false;
    });
  }

  async deleteOrdenPorUsuario(ordenDeTrabajoId: number) {
    await this.backendService.ordenes.deleteOrdenPorUsuario(ordenDeTrabajoId);
    await this.loadOrdenes();
  }

  async buscarOrden(e: Event) {
    e.preventDefault();
    
    this.router.navigate(['/protected/tracking/', this.codigoDeSeguimiento.value]);

    return false;
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

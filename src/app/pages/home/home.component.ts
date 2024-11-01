import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ResumenDeOrdenDTO } from '../../model/resumenDeOrdenDTO';
import { BackendService } from '../../services/backend.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';

declare var $: any;

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

  constructor(private backendService: BackendService, private router: Router, private loadingService: LoadingService) {
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

  async deleteOrdenPorUsuario2(ordenDeTrabajoId: number) {
    $('#confirmacionModal').modal('show');
    $('#confirmacionModal').data('ordenDeTrabajoId', ordenDeTrabajoId);
  }

  async deleteOrdenPorUsuario3() {
    console.log('deleteOrdenPorUsuario3:start');
    this.loadingService.show();
    var ordenDeTrabajoId = $('#confirmacionModal').data('ordenDeTrabajoId');
    console.log('deleteOrdenPorUsuario3', ordenDeTrabajoId);
    await this.backendService.ordenes.deleteOrdenPorUsuario(ordenDeTrabajoId);
    $('#confirmacionModal').modal('hide');
    await this.loadOrdenes();
    this.loadingService.hide();
    console.log('deleteOrdenPorUsuario3:end');
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

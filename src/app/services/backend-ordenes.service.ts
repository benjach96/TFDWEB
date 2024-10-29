import { Injectable } from '@angular/core';
import { ResumenDeOrdenDTO } from '../model/resumenDeOrdenDTO';
import { DetalleDeOrdenDTO } from '../model/detalleDeOrdenDTO';
import { BackendService } from './backend.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendOrdenesService {

  constructor(private backendService: BackendService, private authenticationService: AuthService) { }

  private getCurrentUserId(): number {
    var user= this.authenticationService.getUser();
    if (!user) {
      throw new Error("El usuario tiene que ser autenticado para acceder a este servicio");
    }
    return user.usuarioId;
  }

  getOrdenes(): ResumenDeOrdenDTO[] {
    var userId = this.getCurrentUserId();

    var ordenesPorUsuario = this.backendService.database.ordenesPorUsuario.filter(orden => orden.usuarioId == userId);
    var resultados = ordenesPorUsuario.map(ordenPorUsuario => {
      var orden = this.backendService.database.ordenes.find(orden => orden.ordenDeTrabajoId == ordenPorUsuario.ordenDeTrabajoId);
      if (!orden) {
        throw new Error("No se encontró la orden de trabajo asociada a la orden del usuario");
      }
      var envios = this.backendService.database.envios.filter(envio => envio.ordenDeTrabajoId == orden!.ordenDeTrabajoId);
      var envio = envios.length > 0 ? envios[0] : null;
      var resumenDeOrden : ResumenDeOrdenDTO = {
        codigoDeSeguimiento: orden?.codigoDeSeguimiento,
        fechaDeCreacion: orden?.fechaDeCreacion,
        estado: orden?.estado,
        fechaEstimadaDeEntrega: orden?.fechaEstimadaDeEntrega,
        fechaEstimadaDeEnvio: orden?.fechaEstimadaDeEnvio,
        ordenDeTrabajoId: orden?.ordenDeTrabajoId,
        fechaDeEntrega: envio?.fechaDeEntrega,
        fechaDeEnvio: envio?.fechaDeCreacion,
      }
      return resumenDeOrden;
    });

    return resultados;
  }

  getOrdenPorCodigoDeSeguimiento(codigoDeSeguimiento: string): DetalleDeOrdenDTO | null {
    var userId = this.getCurrentUserId();

    // Buscar orden segun el codigo de seguimiento
    var orden = this.backendService.database.ordenes.find(orden => orden.codigoDeSeguimiento == codigoDeSeguimiento);
    if (!orden) {
      return null;
    }
    
    // Crear graph basado en la orden
    var fabrica = this.backendService.database.fabricas.find(fabrica => fabrica.fabricaId == orden!.fabricaId);
    if (!fabrica) {
      throw new Error("No se encontró la fábrica asociada a la orden de trabajo");
    }
    var envio = this.backendService.database.envios.find(envio => envio.ordenDeTrabajoId == orden!.ordenDeTrabajoId);

    var result : DetalleDeOrdenDTO = {
      clienteId: orden.clienteId,
      codigoDeSeguimiento: orden.codigoDeSeguimiento,
      estado: orden.estado,
      fechaDeCreacion: orden.fechaDeCreacion,
      fechaDeEntrega: envio?.fechaDeEntrega,
      direccionDeEntrega: orden.direccionDeEntrega,
      fabricaId: orden.fabricaId,
      fechaEstimadaDeEntrega: orden.fechaEstimadaDeEntrega,
      fechaEstimadaDeEnvio: orden.fechaEstimadaDeEnvio,
      fechaDeEnvio: envio?.fechaDeCreacion,
      fechaEstimadaDeTermino: orden.fechaEstimadaDeTermino,
      ordenDeTrabajoId: orden.ordenDeTrabajoId,
      lugarDeEntrega: orden.lugarDeEntrega,
      nombreDeLaFabrica: fabrica.nombre,
      pesoEnKilos: orden.pesoEnKilos,
      envioId: envio?.envioId
    }

    // Agregar orden a la lista de ordenes del usuario
    var ordenPorUsuario = this.backendService.database.ordenesPorUsuario.find(
      ordenPorUsuario => ordenPorUsuario.ordenDeTrabajoId == orden!.ordenDeTrabajoId && ordenPorUsuario.usuarioId == userId);

    if (!ordenPorUsuario) {
      this.backendService.database.ordenesPorUsuario.push({
        ordenDeTrabajoId: orden.ordenDeTrabajoId,
        usuarioId: userId,
        fechaDeCreacion: new Date()
      });
    }

    return result;
  }
}

import { Injectable } from '@angular/core';
import { ResumenDeOrdenDTO } from '../model/resumenDeOrdenDTO';
import { DetalleDeOrdenDTO } from '../model/detalleDeOrdenDTO';
import { BackendService } from './backend.service';
import { AuthService } from './auth.service';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class BackendOrdenesService {

  constructor(private backendService: BackendService, private securityService: SecurityService) { }

  private getCurrentUserId(): number {
    var usuarioId = this.securityService.getUserId();
    if (!usuarioId) {
      throw new Error("El usuario tiene que ser autenticado para acceder a este servicio");
    }
    return usuarioId;
  }

  getOrdenes(): Promise<ResumenDeOrdenDTO[]> {
    return new Promise((resolve, reject) => {
      try {
        var userId = this.getCurrentUserId();
        var db = this.backendService.getDatabase();

        var ordenesPorUsuario = db.ordenesPorUsuario.filter(orden => orden.usuarioId == userId);
        var resultados = ordenesPorUsuario.map(ordenPorUsuario => {
          var orden = db.ordenes.find(orden => orden.ordenDeTrabajoId == ordenPorUsuario.ordenDeTrabajoId);
          if (!orden) {
            throw new Error("No se encontró la orden de trabajo asociada a la orden del usuario");
          }
          var envios = db.envios.filter(envio => envio.ordenDeTrabajoId == orden!.ordenDeTrabajoId);
          var envio = envios.length > 0 ? envios[0] : null;
          var resumenDeOrden: ResumenDeOrdenDTO = {
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

        // Simular demora de red
        setTimeout(() => {
          resolve(resultados);
        }, 1000); // demora de 1 segundo
      }
      catch (error) {
        reject(error);
      }
    });
  }

  getOrdenPorCodigoDeSeguimiento(codigoDeSeguimiento: string): Promise<DetalleDeOrdenDTO | null> {
    return new Promise((resolve, reject) => {
      try {
        const userId = this.getCurrentUserId();
        var db = this.backendService.getDatabase();

        // Buscar orden según el código de seguimiento
        const orden = db.ordenes.find(orden => orden.codigoDeSeguimiento == codigoDeSeguimiento);
        if (!orden) {
          return resolve(null);
        }

        // Crear graph basado en la orden
        const fabrica = db.fabricas.find(fabrica => fabrica.fabricaId == orden!.fabricaId);
        if (!fabrica) {
          throw new Error("No se encontró la fábrica asociada a la orden de trabajo");
        }
        const envio = db.envios.find(envio => envio.ordenDeTrabajoId == orden!.ordenDeTrabajoId);

        const result: DetalleDeOrdenDTO = {
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
        };

        // Agregar orden a la lista de ordenes del usuario
        let ordenPorUsuario = db.ordenesPorUsuario.find(
          ordenPorUsuario => ordenPorUsuario.ordenDeTrabajoId == orden!.ordenDeTrabajoId && ordenPorUsuario.usuarioId == userId);

        if (!ordenPorUsuario) {
          db.ordenesPorUsuario.push({
            ordenDeTrabajoId: orden.ordenDeTrabajoId,
            usuarioId: userId,
            fechaDeCreacion: new Date()
          });
        }

        // Simular demora de red
        setTimeout(() => {
          resolve(result);
        }, 1000); // demora de 1 segundo
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteOrdenPorUsuario(orderByTrabajoId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const userId = this.getCurrentUserId();
        var db = this.backendService.getDatabase();

        const ordenPorUsuario = db.ordenesPorUsuario.find(
          ordenPorUsuario => ordenPorUsuario.ordenDeTrabajoId == orderByTrabajoId && ordenPorUsuario.usuarioId == userId);
        if (ordenPorUsuario) {
          const index = db.ordenesPorUsuario.indexOf(ordenPorUsuario);
          db.ordenesPorUsuario.splice(index, 1);

          this.backendService.saveDatabase();
        }

        // Simular demora de red
        setTimeout(() => {
          resolve();
        }, 1000); // demora de 1 segundo
      } catch (error) {
        reject(error);
      }
    });
  }
}

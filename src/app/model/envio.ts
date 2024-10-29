export interface Envio {
    envioId: number;
    ordenDeTrabajoId: number;
    fechaDeEntrega?: Date;
    fechaDeCreacion: Date;
    estado: string;
  }
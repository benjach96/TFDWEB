export interface ResumenDeOrdenDTO {
    ordenDeTrabajoId: number;
    fechaEstimadaDeEnvio: Date;
    fechaEstimadaDeEntrega: Date;
    fechaDeEntrega?: Date;
    fechaDeEnvio?: Date;
    fechaDeCreacion: Date;
    codigoDeSeguimiento: string;
    estado: string;
  }
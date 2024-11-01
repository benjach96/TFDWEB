export interface Envio {
  envioId: number;
  ordenDeTrabajoId: number;
  fechaDeEntrega?: Date;
  fechaDeCreacion: Date;
  conductorId: number;
  estado: string;
}

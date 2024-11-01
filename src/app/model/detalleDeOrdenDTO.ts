export interface DetalleDeOrdenDTO {
  ordenDeTrabajoId: number;
  fechaEstimadaDeTermino: Date;
  fechaEstimadaDeEnvio: Date;
  fechaEstimadaDeEntrega: Date;
  fechaDeEntrega?: Date;
  fechaDeEnvio?: Date;
  fechaDeCreacion: Date;
  clienteId: number;
  codigoDeSeguimiento: string;
  lugarDeEntrega: string;
  direccionDeEntrega: string;
  pesoEnKilos: number;
  fabricaId: number;
  nombreDeLaFabrica: string;
  envioId?: number;
  conductorId?: number;
  conductorNombres?: string;
  conductorApellidos?: string;
  conductorTelefono?: string;
  estado: string;
}

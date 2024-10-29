export interface OrdenDeTrabajo {
    ordenDeTrabajoId: number;
    fechaEstimadaDeTermino: Date;
    fechaEstimadaDeEnvio: Date;
    fechaEstimadaDeEntrega: Date;
    fechaDeCreacion: Date;
    clienteId: number;
    fabricaId: number;
    codigoDeSeguimiento: string;
    descripcion: string;
    pesoEnKilos: number;
    lugarDeEntrega: string;
    direccionDeEntrega: string;
    estado: string;
    // cliente: Cliente;
    // envios: Envio[];
    // fabrica: Fabrica;
    // ordenPorUsuarios: OrdenPorUsuario[];
  }
import { User } from '../model/user';
import { OrdenDeTrabajo } from '../model/ordenDeTrabajo';
import { OrdenPorUsuario } from '../model/ordenPorUsuario';
import { Envio } from '../model/envio';
import { Fabrica } from '../model/fabrica';

export type Database = {
    usuarios: User[],
    ordenes: OrdenDeTrabajo[],
    ordenesPorUsuario: OrdenPorUsuario[],
    envios: Envio[],
    fabricas: Fabrica[]
}
export var db: Database = {
    "usuarios": [
        {
            usuarioId: 1,
            nombres: "Juan",
            apellidos: "Perez",
            email: "juan.perez@betondecken.com.pe",
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            passwordHash: "123456",
            estado: "A"
        },
        {
            usuarioId: 2,
            nombres: "Martin",
            apellidos: "Alvarez",
            email: "martin.alvarez@betondecken.com.pe",
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            passwordHash: "123456",
            estado: "A"
        }
    ],
    "ordenesPorUsuario":[
        {
            usuarioId: 1,
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            ordenDeTrabajoId: 1
        },
        {
            usuarioId: 1,
            fechaDeCreacion: new Date("2022-07-01T00:00:00"),
            ordenDeTrabajoId: 2
        },
        {
            usuarioId: 1,
            fechaDeCreacion: new Date("2022-07-01T00:00:00"),
            ordenDeTrabajoId: 3
        },
        {
            usuarioId: 2,
            fechaDeCreacion: new Date("2023-07-01T00:00:00"),
            ordenDeTrabajoId: 3
        },
    ],
    "ordenes": [
        {
            clienteId: 1,
            codigoDeSeguimiento:"CS123",
            descripcion: "Orden de trabajo 1",
            direccionDeEntrega: "Av. Los Pinos 123",
            estado: "C",
            fabricaId: 1,
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            fechaEstimadaDeEntrega: new Date("2021-07-10T00:00:00"),
            fechaEstimadaDeEnvio: new Date("2021-07-05T00:00:00"),
            fechaEstimadaDeTermino: new Date("2021-07-15T00:00:00"),
            lugarDeEntrega: "Lima",
            ordenDeTrabajoId: 1,
            pesoEnKilos: 1000
        },
        {
            clienteId: 1,
            codigoDeSeguimiento:"CS124",
            descripcion: "Orden de trabajo 2",
            direccionDeEntrega: "Av. Los Altos 321",
            estado: "E",
            fabricaId: 1,
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            fechaEstimadaDeEntrega: new Date("2021-07-10T00:00:00"),
            fechaEstimadaDeEnvio: new Date("2021-07-05T00:00:00"),
            fechaEstimadaDeTermino: new Date("2021-07-15T00:00:00"),
            lugarDeEntrega: "Lima",
            ordenDeTrabajoId: 2,
            pesoEnKilos: 2000
        },
        {
            clienteId: 1,
            codigoDeSeguimiento:"CS125",
            descripcion: "Orden de trabajo 3",
            direccionDeEntrega: "Prolongacion Primavera 2390, Santiago de Surco 15023, Peru",
            estado: "P",
            fabricaId: 1,
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            fechaEstimadaDeEntrega: new Date("2021-07-10T00:00:00"),
            fechaEstimadaDeEnvio: new Date("2021-07-05T00:00:00"),
            fechaEstimadaDeTermino: new Date("2021-07-15T00:00:00"),
            lugarDeEntrega: "UPC Campus Monterrico",
            ordenDeTrabajoId: 3,
            pesoEnKilos: 3000
        }
    ],
    "envios": [
        {
            envioId: 1,
            ordenDeTrabajoId: 1,
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            fechaDeEntrega: new Date("2021-07-10T00:00:00"),
            estado: "C"
        },
        {
            envioId: 2,
            ordenDeTrabajoId: 2,
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            fechaDeEntrega: undefined,
            estado: "E"
        }
    ],
    "fabricas": [
        {
            fabricaId: 1,
            nombre: "Fabrica 1",
            fechaDeCreacion: new Date("2021-07-01T00:00:00")
        },
        {
            fabricaId: 2,
            nombre: "Fabrica 2",
            fechaDeCreacion: new Date("2021-07-01T00:00:00")
        }
    ]
}
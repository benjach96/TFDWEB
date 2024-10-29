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
            "usuarioId": 1,
            "nombres": "Juan",
            "apellidos": "Perez",
            "email": "juan.perez@betondecken.com.pe",
            "fechaDeCreacion": new Date("2021-07-01T00:00:00"),
            "passwordHash": "123456",
            "estado": "A"
        },
        {
            "usuarioId": 2,
            "nombres": "Martin",
            "apellidos": "Alvarez",
            "email": "martin.alvarez@betondecken.com.pe",
            "fechaDeCreacion": new Date("2021-07-01T00:00:00"),
            "passwordHash": "123456",
            "estado": "A"
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
            usuarioId: 2,
            fechaDeCreacion: new Date("2023-07-01T00:00:00"),
            ordenDeTrabajoId: 3
        },
    ],
    "ordenes": [
        {
            clienteId: 1,
            codigoDeSeguimiento:"XYZ123",
            descripcion: "Orden de trabajo 1",
            direccionDeEntrega: "Av. Los Pinos 123",
            estado: "P",
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
            codigoDeSeguimiento:"XYZ124",
            descripcion: "Orden de trabajo 2",
            direccionDeEntrega: "Av. Los Altos 321",
            estado: "P",
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
            codigoDeSeguimiento:"XYZ124",
            descripcion: "Orden de trabajo 3",
            direccionDeEntrega: "Av. Los Altos 222",
            estado: "P",
            fabricaId: 1,
            fechaDeCreacion: new Date("2021-07-01T00:00:00"),
            fechaEstimadaDeEntrega: new Date("2021-07-10T00:00:00"),
            fechaEstimadaDeEnvio: new Date("2021-07-05T00:00:00"),
            fechaEstimadaDeTermino: new Date("2021-07-15T00:00:00"),
            lugarDeEntrega: "Lima",
            ordenDeTrabajoId: 3,
            pesoEnKilos: 3000
        }
    ],
    "envios": [

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
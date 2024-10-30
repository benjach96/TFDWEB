export interface Usuario {
    usuarioId: number;
    email: string;
    passwordHash: string;
    nombres: string;
    apellidos: string;
    fechaDeCreacion: Date;
    estado: string;
}

export interface User {
    usuarioId: number;
    email: string;
    passwordHash: string;
    nombres: string;
    apellidos: string;
    fechaDeCreacion: Date;
    estado: string;
}

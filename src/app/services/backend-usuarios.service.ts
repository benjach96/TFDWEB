import { ErrorSimple } from "../model/errorSimple";
import { NuevoUsuarioInput } from "../model/nuevoUsuarioInput";
import { PostUsuarioDTO } from "../model/postUsuarioDTO";
import { Usuario } from "../model/usuario";
import { VerificarCredencialesInput } from "../model/verificarCredencialesInput";
import { BackendService } from "./backend.service";

export class BackendUserService {

  constructor(private backendService: BackendService) { }

  verificarCredenciales(credenciales: VerificarCredencialesInput): Promise<PostUsuarioDTO | null> {
    return new Promise((resolve, reject) => {
      try {
        // Nota: Este método es un mock de la funcionalidad de autenticación de usuarios.
        const user = this.backendService.getDatabase().usuarios.find(user => user.email == credenciales.email && user.passwordHash == credenciales.password);
        if (!user) {
          // Simular demora de red
          setTimeout(() => {
            resolve(null);
          }, 1000); // demora de 1 segundo
        }
        else {
          var result: PostUsuarioDTO = {
            apellidos: user!.apellidos,
            email: user!.email,
            estado: user!.estado,
            fechaDeCreacion: user!.fechaDeCreacion,
            nombres: user!.nombres,
            usuarioId: user!.usuarioId
          }
          // Simular demora de red
          setTimeout(() => {
            resolve(result);
          }, 1000); // demora de 1 segundo
        }
      }
      catch (error) {
        reject(error);
      };
    });
  }

  postUsuario(nuevoUsuario: NuevoUsuarioInput): Promise<PostUsuarioDTO | ErrorSimple> {
    return new Promise((resolve, reject) => {
      try {
        // Nota: Este método es un mock de la funcionalidad de registro de usuarios.
        const user = this.backendService.getDatabase().usuarios.find(user => user.email == nuevoUsuario.email);
        if (user) {
          // Simular demora de red
          setTimeout(() => {
            resolve({ codigo: 99, mensaje: "El usuario ya existe" });
          }, 1000); // demora de 1 segundo
        }
        else {
          const newUser: Usuario = {
            apellidos: nuevoUsuario.apellidos,
            email: nuevoUsuario.email,
            estado: "A",
            fechaDeCreacion: new Date(),
            nombres: nuevoUsuario.nombres,
            passwordHash: nuevoUsuario.password,
            usuarioId: this.backendService.getDatabase().usuarios.length + 1
          }
          this.backendService.getDatabase().usuarios.push(newUser);
          this.backendService.saveDatabase();
          // Simular demora de red
          setTimeout(() => {
            resolve(newUser);
          }, 1000); // demora de 1 segundo
        }
      }
      catch {
        reject();
      }
    });
  }

}

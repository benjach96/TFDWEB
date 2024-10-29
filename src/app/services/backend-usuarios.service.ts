import { NuevoUsuarioInput } from "../model/nuevoUsuarioInput";
import { PostUsuarioDTO } from "../model/postUsuarioDTO";
import { VerificarCredencialesInput } from "../model/verificarCredencialesInput";
import { BackendService } from "./backend.service";

export class BackendUserService {

  constructor(private backendService: BackendService) { }

  verificarCredenciales(credenciales: VerificarCredencialesInput): PostUsuarioDTO | null {
    // Nota: Este método es un mock de la funcionalidad de autenticación de usuarios.
    const user = this.backendService.database.usuarios.find(user => user.email == credenciales.email && user.passwordHash == credenciales.password);
    if (!user) {
      return null;
    }

    var result: PostUsuarioDTO = {
      apellidos: user.apellidos,
      email: user.email,
      estado: user.estado,
      fechaDeCreacion: user.fechaDeCreacion,
      nombres: user.nombres,
      usuarioId: user.usuarioId
    }

    return result;
  }

  postUsuario(nuevoUsuario: NuevoUsuarioInput): PostUsuarioDTO {
    throw new Error("Method not implemented.");
  }

}

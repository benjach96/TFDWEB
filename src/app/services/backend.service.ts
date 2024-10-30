import { Injectable } from '@angular/core';
import { BackendUserService } from './backend-usuarios.service';
import { Database, db } from './db';
import { BackendOrdenesService } from './backend-ordenes.service';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  users: BackendUserService;
  ordenes: BackendOrdenesService;
  /**
   * Emulación de una base de datos en memoria. Se reemplazará por una API REST en la siguiente iteración.
   */
  private database: Database;

  constructor(private securityService: SecurityService) {
    this.users = new BackendUserService(this);
    this.ordenes = new BackendOrdenesService(this, securityService);
    this.database = this.loadDatabase();
    //this.database = db;
  }

  loadDatabase(): Database {
    //console.log('Cargando base de datos...');
    let result: Database;

    if (typeof window !== 'undefined') {
      try{
        result = JSON.parse(localStorage.getItem('db') ?? '{}', (key, value) => {
          // localStorage solo soporta strings, por lo que las fechas se convierten en strings al guardarlas
          // Aquí las convertimos nuevamente a objetos Date
          if (key.indexOf("fecha") !== -1) {
            return new Date(value);
          }
          return value;
        });
      }
      catch {
        result = db; // Valor por defecto si localStorage no está disponible
      }
    } else {
      result = db; // Valor por defecto si localStorage no está disponible
    }

    // Si la base de datos no tiene la estructura correcta, la reiniciamos
    if (!result.usuarios) {
      console.log('Invalido, recreando base de datos...', db);
      this.database = result = db;
      this.saveDatabase();
    }

    //console.log('Carga completada.', result);

    return result;
  }

  saveDatabase() {
    console.log('Guardando base de datos...', this.database);
    if (typeof window !== 'undefined') {
      localStorage.setItem('db', JSON.stringify(this.database));
    }
  }

  getDatabase(): Database {
    return this.database;
  }

}

import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BackendUserService } from './backend-usuarios.service';
import { Database, db } from './db';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  users: BackendUserService;
  /**
   * Emulación de una base de datos en memoria. Se reemplazará por una API REST en la siguiente iteración.
   */
  database: Database;

  constructor() {
    this.users = new BackendUserService(this);
    this.database = this.loadDatabase();
  }

  loadDatabase(): Database {
    console.log('Cargando base de datos...');
    let result: Database;

    // if (typeof window !== 'undefined') {
    //   result = JSON.parse(localStorage.getItem('db') ?? '{}');
    // } else {
    //   result = db; // Valor por defecto si localStorage no está disponible
    // }

    try{
      result = JSON.parse(localStorage.getItem('db') ?? '{}');
    }
    catch {
      result = db; // Valor por defecto si localStorage no está disponible
    }

    // Si la base de datos no tiene la estructura correcta, la reiniciamos
    if (!result.usuarios) {
      console.log('Invalido, recreando base de datos...', db);
      this.database = result = db;
      this.saveDatabase();
    }

    console.log('Carga completada.', result);

    return result;
  }

  saveDatabase() {
    console.log('Guardando base de datos...', this.database);
    if (typeof window !== 'undefined') {
      localStorage.setItem('db', JSON.stringify(this.database));
    }
  }
}

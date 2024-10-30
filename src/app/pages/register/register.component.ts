import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../services/backend.service';
import { NuevoUsuarioInput } from '../../model/nuevoUsuarioInput';
import { ErrorSimple } from '../../model/errorSimple';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  newRecordForm = new FormGroup({
    nombres: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    apellidos: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('',
      [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
    confirmacionDePassword: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(12), this.passwordsMatchValidator('password')]),
  });

  isSaving = false;
  isError = false;
  errorMessage = '';

  constructor(private backendService: BackendService, private router: Router) { }

  async createAccount() {
    this.isError = false;
    this.isSaving = true;

    var input = this.newRecordForm.value as NuevoUsuarioInput;
    var result = await this.backendService.users.postUsuario(input);
    this.isSaving = false;

    if (result === null || (result as ErrorSimple).codigo) {
      this.isError = true;
      var error = result as ErrorSimple;
      if (error.codigo == 99) {
        this.errorMessage = error.mensaje;
      }
      else {
        this.errorMessage = 'Se produjo un error al crear el usuario, por favor intente nuevamente.';
      }
    }
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          message: 'Usuario creado satisfactoriamente.'
        }
      };
      this.router.navigate(['/login'], navigationExtras);
    }
  }

  testState() {
    const navigationExtras: NavigationExtras = {
      state: {
        message: 'Usuario creado satisfactoriamente.'
      }
    };
    this.router.navigate(['/login'], navigationExtras);
  }

  passwordsMatchValidator(passwordControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.root.get(passwordControlName);
      return password && control.value !== password.value ? { passwordMatch: true } : null;
    };
  }
}

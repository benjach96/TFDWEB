import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isLoggingIn = false;
  isInvalidUser = false;
  errorMessage = '';
  message = '';

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Recuperar el mensaje si es que es un redirect desde el registro de un nuevo cliente
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { message: string };
    if (state) {
      this.message = state.message;
    };
  }

  async login() {
    this.errorMessage = '';
    this.message = '';
    this.isLoggingIn = true;

    var result = await this.authService.login(
      this.applyForm.value.email ?? '', this.applyForm.value.password ?? '');

    this.isLoggingIn = false;
    if (!result) {
      this.isInvalidUser = true;
      this.errorMessage = 'Invalid email or password';
    }
    else {
      this.router.navigate(['/protected']);
    }

  }
}

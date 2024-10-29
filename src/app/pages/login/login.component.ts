import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { Router, RouterLink } from '@angular/router';
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

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private userService: AuthService,
    private router: Router
  ) {
  }

  async login() {
    console.log('start:login');
    this.errorMessage = '';
    this.isLoggingIn = true;

    var result = await this.userService.login(
      this.applyForm.value.email ?? '', this.applyForm.value.password ?? '');

    this.isLoggingIn = false;
    console.log('result:', result);
    if (!result) {
      this.isInvalidUser = true;
      this.errorMessage = 'Invalid email or password';
    }
    else {
      this.router.navigate(['/protected']);
    }
    
    console.log('end:login');
  }
}

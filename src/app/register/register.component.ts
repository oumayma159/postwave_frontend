import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

import { RegisterRequest } from '../models/register-request.model'; // Adjust the path as necessary
import { Role } from '../enums/role.enum';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = Role; 
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [Role.USER, Validators.required] 
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: response => {
          console.log('Registration successful', response);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          localStorage.setItem('accessToken', response.access_token);
          console.log('Token saved', response.access_token);
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Registration error', error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  }
}
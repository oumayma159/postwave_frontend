import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { AuthenticationRequest } from '../models/authentication-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: AuthenticationRequest = this.loginForm.value;
      this.authService.login(loginRequest).subscribe({
        next: response => {
          console.log('Login successful', response);
          localStorage.setItem('accessToken', response.access_token);
          this.isLoggedIn = true;
          // this.storageService.saveUser(response.user); 
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Login error', error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      });
    }
  }
}
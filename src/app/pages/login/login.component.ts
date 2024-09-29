import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthenticationRequest } from '../../models/authentication-request.model';

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
          localStorage.setItem('accessToken', response.access_token);
          //update observable
          this.authService.isLoggedIn$.next(true);
          // role based authentification
          if (response.role.includes('USER')) {
            this.router.navigate(['/home']);
          }
          else if (response.role.includes('ADMIN')) {
            this.router.navigate(['/admin']);
          }
          this.loginForm.reset();
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
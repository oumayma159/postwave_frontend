import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { RegisterRequest } from '../../models/register-request.model'; 
import { Role } from '../../models/enums/role.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = Role; 
  isSuccessful = false;
  error={isSignUpFailed:false};
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        // Validators.minLength(6),
        // Validators.pattern(/(?=.*[A-Z])/), 
        // Validators.pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/), 
      ]],
      role: [Role.USER, Validators.required] 
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as RegisterRequest,this.error).subscribe(
       (response) => {
          this.isSuccessful = true;
          this.error.isSignUpFailed = false;
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('userId', response.userId.toString());
          //update observable
          this.authService.isLoggedIn$.next(true);
          if (response.role == "USER") {
            this.router.navigate(['/home']);
          }
          else {
            this.router.navigate(['/admin']);
          }
          this.registerForm.reset();
        
      });
    }
  }
}
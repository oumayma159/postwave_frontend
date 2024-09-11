import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { AuthenticationRequest } from '../models/authentication-request.model'; // Import AuthenticationRequest

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorMessage = '';
  isLoggedIn$ = new BehaviorSubject<boolean>(false); 

  private apiUrl = `http://localhost:8080/api/v1/auth`;

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest,error:{isSignUpFailed:boolean}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerRequest)
    .pipe(
      catchError((error)=>{
        console.error('Error registering user');
        this.errorMessage = error.error.message;
        error.isSignUpFailed = true;
        return EMPTY;
      }
    )); 
  }

  login(authenticationRequest: AuthenticationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, authenticationRequest);
  }
}
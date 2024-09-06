import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { AuthenticationRequest } from '../models/authentication-request.model'; // Import AuthenticationRequest

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false); 

  private apiUrl = `http://localhost:8080/api/v1/auth`;

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerRequest);
  }

  login(authenticationRequest: AuthenticationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, authenticationRequest);
  }
}
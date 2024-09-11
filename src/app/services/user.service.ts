import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,catchError,EMPTY} from 'rxjs';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  //http method return an observable thar will be used in the component (profile)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all_users`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching users', err);
        return EMPTY;
      })
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get_user_by_email/${email}`);
  }

  getUserFromToken(): Observable<User> { 
    return this.http.get<User>(`${this.apiUrl}/currentUser`);
  }
}
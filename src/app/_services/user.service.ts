import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/user';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all_users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get_user/${id}`);
  }

  getUserFromToken(token: string): Observable<User> {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const userId = decodedToken.sub; 
    return this.getUserById(userId);
  }
}
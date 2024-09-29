import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `http://localhost:8080/api/v1/admin`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all_users`)
    .pipe(
      catchError((err) => {
        console.error('Error fetching users', err);
        return EMPTY;
      })
    );
  }

}
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `http://localhost:8080/api/v1/admin`;

  constructor(private http: HttpClient) { }

}
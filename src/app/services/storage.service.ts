import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }


  public isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
  }
}
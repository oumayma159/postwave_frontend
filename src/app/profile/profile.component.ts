import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'; 
import { User } from '../models/user.model'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error fetching users', err);
        this.errorMessage = err.error.message;
      }
    });
  }
}
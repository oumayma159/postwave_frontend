import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';
import { User } from '../models/user.model'; // Adjust the path as necessary

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  user: User | null = null;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const userId = this.storageService.getUser().id; 
    console.log('User ID', userId);
    this.userService.getUserById(userId).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
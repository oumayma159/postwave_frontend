import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; 
import { User } from '../../models/user.model'; 


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent  {
  users$ =  this.userService.getAllUsers()
  constructor(private userService: UserService) {}

}
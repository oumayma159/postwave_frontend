import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent  {
  user$ = this.userService.getUserFromToken();

  constructor(
    private userService: UserService
  ) {}

}
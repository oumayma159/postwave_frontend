import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  user: User | null = null;
  errorMessage = '';

  constructor(
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user'];
    });
  }
}